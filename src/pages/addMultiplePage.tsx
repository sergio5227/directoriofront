import React, { useState } from "react";
import { Alert, Button, Container, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "../componets/Header";
import EmployeesAddMultipleForm from "../componets/EmployeesAddMultipleForm";
import ImagesUpload from "../componets/EmployeesAddMultipleForm/imagesUpload";
import UploadBrn from "../componets/EmployeesAddMultipleForm/UploadBrn";
import { fromFileToBase64 } from "../utils";
import { storeMasivo } from "../actions/employees";
import DinamicTable from "../componets/DinamicTable";

const AddMultiplePage = () => {
  const inSession = useSelector(
    (state: any) => state?.app?.user?.user || false
  );
  const [procesando, setProcesando] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [step, setStep] = useState<number>(1);
  const addEmployees = async (elemento: any) => {
    try {
      setProcesando(true);
      setTimeout(() => {
        setData(elemento?.data_ || []);
        setProcesando(false);
        alert("Se agrego el archivo de excel corretamente");
        setStep(2);
      }, 5000);
    } catch (error) {
      alert(error);
      setProcesando(false);
    }
  };

  const saveImages = async (files: any) => {
    setProcesando(true);
    const objectToUpdate = data.map((dta: any) => {
      const imagenEncontrada = files.find(
        (file_: any) => dta?.["NOMBRE FOTO IMAGEN"] === file_.name
      );
      return {
        nombre:
          dta?.nombre +
          " " +
          dta?.apellido_paterno +
          " " +
          dta?.apellido_materno,
        extension: dta?.extencion,
        sede: dta?.sede,
        ubicacion_piso: dta?.ubicacion,
        puesto: dta?.cargo,
        correo: dta?.email,
        unidad_adtva: dta?.area,
        imagen_nombre: dta?.["NOMBRE FOTO IMAGEN"],
        imagen_archivoPreview: imagenEncontrada?.fileImage,
        imagen_file: imagenEncontrada,
      };
    });
    setData(objectToUpdate);
    setProcesando(false);
    setStep(3);
  };

  const asyncForEach = async (array: any[], callback: any) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  const start = async (arr: any[]) => {
    setProcesando(true)
    setData([])
    const noGuadados:any[] = [];
    await asyncForEach(arr, async (dta: any, num: any) => {
      try {
        const data1 = new FormData();
        data1.append("imagen", dta?.imagen_file || 'null');
        data1.append("nombre", dta?.nombre);
        data1.append("correo", dta?.correo || 'null');
        data1.append("extension", dta?.extension);
        data1.append("puesto", dta?.puesto);
        data1.append("sede", dta?.sede);
        data1.append("ubicacion_piso", dta?.ubicacion_piso);
        data1.append("unidad_adtva", dta?.unidad_adtva);
        const response:any = await storeMasivo(data1);
        if(!response?.data?.id){
          noGuadados.push(response?.data)
        }
        console.log('respuesta de data',dta)
      } catch (error) {
        console.log("error", num, dta,error);
      }
    });
    if(noGuadados?.length !== 0){
      console.log('noGuadados',noGuadados)
      setData(noGuadados)
      setStep(5);
    }else{
      setStep(4);
      
    }
    setProcesando(false)
  };

  const enAccionGuardar = () => {
    start(data);
  };

  const estableceImagen = async (accion: any, row: any, file: any) => {
    const elemento64 = await fromFileToBase64(file?.imagen);
    const objectToUpdate = data;
    const upd_obj = objectToUpdate.map((usuario: any) => {
      if (
        usuario?.correo === row?.correo &&
        usuario?.extension === row?.extension &&
        usuario?.nombre === row?.nombre &&
        usuario?.puesto === row?.puesto &&
        usuario?.sede === row?.sede &&
        usuario?.ubicacion_piso === row?.ubicacion_piso &&
        usuario?.unidad_adtva === row?.unidad_adtva
      ) {
        usuario.imagen_archivoPreview = elemento64;
        usuario.imagen_nombre = file?.imagen?.name;
        usuario.imagen_file = file?.imagen;
      }
      return usuario;
    });
    setData(upd_obj);
  };

  return (
    <div>
      <Header inSession={inSession} />
      <Container fluid>
        {step === 1 ? (
          <EmployeesAddMultipleForm
            procesando={procesando}
            enAccion={(json: any) => addEmployees(json)}
          />
        ) : null}
        {step === 2 ? (
          <ImagesUpload data={data} onAction={(files) => saveImages(files)} />
        ) : null}
        {(step  === 3  && !procesando ) ? (
          <UploadBrn
            data={data}
            enAccion={(accion, row, imagen) =>{
              estableceImagen(accion, row, imagen)
            }}
            enAccionGuardar={() => {enAccionGuardar()}}
          />
        ) : null}

        {procesando && step !== 1 ? (
          <ProgressBar now={100} striped label={'Procesando'} variant={'info'} />
        ) : null}

        {step === 4 ? (
          <Alert dismissible show={step === 4} variant={'success'}> 
            <p style={{fontWeight:'bold'}}>
              <a href="/directorio" >
                Todos los usuarios se dieron de alta exitosamente
              </a>
            </p> 
            <Button
                variant="primary"
                onClick={ () => {
                  window.location.replace(
                      "/directorio"
                    );
                  }}
              >
                Terminar
              </Button>
            </Alert> 
        ) : null}

        {step === 5 ? (
          <div> 
            <Alert dismissible show={step === 5} variant={'danger'}> 
              <p style={{fontWeight:'bold'}}>
                Estos elementos no fueron agregados por que ya existen sus correos en la base de datos 
              </p>
              <Button
                variant="primary"
                onClick={ () => {
                  window.location.replace(
                      "/directorio"
                    );
                  }}
              >
                Terminar
              </Button>
            </Alert> 
            <DinamicTable data={data || []} />
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default AddMultiplePage;
