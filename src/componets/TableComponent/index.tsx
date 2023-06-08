import React, { useCallback, useEffect, useState } from "react";
import {
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import PaginationComponent from "./Pagination";
import Image from "react-bootstrap/Image";
import { TableComponentProps } from "./types";

const TableComponent: React.FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<any[]>([]);

  const setItemsTable = useCallback(() => {
    try {
      const nuewdata = (props?.data || []).slice((page - 1) * 10, page * 10);
      setItems(nuewdata);
    } catch (error) {
      console.log(error);
    }
  }, [page, props?.data]);

  useEffect(() => {
    setItemsTable();
  }, [setItemsTable]);

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>nombre</th>
              <th>correo</th>
              <th>extension</th>
              <th>puesto</th>
              <th>sede</th>
              <th>ubicación</th>
              <th>unidad adtva</th>
              <th>imagen</th>
              <th>acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((element, e) => {
              return (
                <tr key={e}>
                  <td>{element?.nombre}</td>
                  <td>{element?.correo}</td>
                  <td>{element?.extension}</td>
                  <td>{element?.puesto}</td>
                  <td>{element?.sede}</td>
                  <td>{element?.ubicacion_piso}</td>
                  <td>{element?.unidad_adtva}</td>
                  <td>
                    <Image
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      thumbnail
                      src={element?.imagen}
                    />
                  </td>
                  <td>
                    <ButtonGroup size="sm">
                      <DropdownButton
                        as={ButtonGroup}
                        title="Acciones"
                        id="bg-nested-dropdown"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          onClick={() => props?.onAction("editar", element)}
                        >
                          Edicion
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="2"
                          onClick={() => props?.onAction("eliminar", element)}
                        >
                          Eliminar
                        </Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <PaginationComponent
          onPage={(page) => setPage(page)}
          elemenmtos={Math.round(props?.data?.length / 10)}
        />
      </div>
    </div>
  );
};

export default TableComponent;
