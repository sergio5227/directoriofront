import React, { useCallback, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { elimina, getEmployees, setEmployees } from "../actions/employees";
import Header from "../componets/Header";
import TableComponent from "../componets/TableComponent";
import Search from "../componets/TableComponent/Search";
import { StoreType } from "../types/geericTypes";

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState<string>("");
  const [procesando, setProcesando] = useState<boolean>();
  const inSession = useSelector(
    (state: StoreType) => state?.app?.user?.user || false
  );

  const data = useSelector((state: any) => {
    return state?.app?.employees?.data || false;
  });

  const getDatosTable = useCallback(async () => {
    try {
      setProcesando(true);
      const response: any = await getEmployees();
      dispatch(setEmployees(response));
      setProcesando(false);
    } catch (error) {
      alert(
        "Ocurrio un error al recuperar los elementos del directorio intente de nuevo mas tarde"
      );
      setProcesando(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getDatosTable();
  }, [getDatosTable]);

  const filteredItems = (data || []).filter(
    (item: any) =>
      (item?.nombre &&
        (item?.nombre || "")
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item?.correo &&
        (item?.correo || "").toLowerCase().includes(filterText.toLowerCase()))
  );

  const eliminar = async (data: any) => {
    if (window.confirm("desea eliminar de forma permanente este registro?")) {
      try {
        setProcesando(true);
        await elimina(data?.id);
        setFilterText("");
        alert("registro eliminado");
        getDatosTable();
      } catch (error) {
        alert(
          "Ocurrio un error al recuperar los elementos del directorio intente de nuevo mas tarde"
        );
        setProcesando(false);
      }
    }
  };

  const editar = (data: any) => {
    setFilterText("");
    navigate(`/directorio-edit`, { state: { data } });
  };

  return (
    <div>
      <Header inSession={inSession ? true : false} />
      {!procesando && (
        <Container fluid>
          <div className="row">
            <div className="col-6">
              <Button
                style={{ float:'right' }}
                variant="success"
                onClick={() => {
                  navigate(`/directorio-add-multiple`);
                }}
              >
                Importar desde excel
              </Button>
              <Button
              style={{  marginRight: "12px",float:'right' }}
                variant="primary"
                onClick={() => {
                  navigate(`/directorio-add`);
                }}
              >
                Agregar
              </Button>
            </div>
            <div className="col-6">
              <Search
                filterText={filterText}
                setFilterTextAction={(filt: string) => setFilterText(filt)}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <TableComponent
              key={filteredItems?.length}
              data={filteredItems}
              onAction={(action, data) =>
                action === "editar" ? editar(data) : eliminar(data)
              }
            />
          </div>
        </Container>
      )}
      {procesando && (
        <Container fluid>
          <div style={{ width: "100%", textAlign: "center" }}>
            <h1>Procesando...</h1>
          </div>
        </Container>
      )}
    </div>
  );
};

export default EmployeesPage;
