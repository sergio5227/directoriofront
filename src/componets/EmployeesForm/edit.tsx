import { useFormik, FormikProvider } from "formik";
import React, { useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import Image from 'react-bootstrap/Image'
import InputField from "../InputField";
import { EmployeesFormProps } from "./types";
import useEffectOnce from "../../hocs/useEffectOns";
import { useLocation } from "react-router-dom";

const EmployeesEditForm: React.FC<EmployeesFormProps> = (
  props: EmployeesFormProps
) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [extension, setExtension] = useState("");
  const [puesto, setPuesto] = useState("");
  const [sede, setSede] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [unidadAdtva, setUnidadAdtva] = useState("");
  const [imagen, setImagen] = useState<any>(null);

  const data:any = useLocation();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      correo: "",
      extension: "",
      puesto: "",
      sede: "",
      ubicacion: "",
      unidadAdtva: "",
      imagen: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(4, "El nombre debe de tener al menos una longitud de 4 caracteres")
        .max(
          50,
          "El nombre debe de tener un maximo de longitud de 50 caracteres"
        )
        .required("requerido"),
        correo: Yup.string()
        .min(6, "El correo debe de tener al menos una longitud de 6 caracteres")
        .max(
          50,
          "El correo debe de tener un maximo de longitud de 50 caracteres"
        )
        .required("requerido")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Formato invalido"
        ),
        extension: Yup.string()
        .min(2, "la extension debe de tener al menos una longitud de 2 caracteres")
        .max(
          50,
          "la extension debe de tener un maximo de longitud de 50 caracteres"
        )
        .required("requerido"),
        puesto: Yup.string()
        .min(4, "El puesto debe de tener al menos una longitud de 4 caracteres")
        .max(
          500,
          "El puesto debe de tener un maximo de longitud de 500 caracteres"
        )
        .required("requerido"),
        sede: Yup.string()
        .min(4, "La sede debe de tener al menos una longitud de 4 caracteres")
        .max(
          500,
          "La sede debe de tener un maximo de longitud de 500 caracteres"
        )
        .required("requerido"),
        ubicacion: Yup.string()
        .min(4, "La ubicacion debe de tener al menos una longitud de 4 caracteres")
        .max(
          500,
          "La ubicacion debe de tener un maximo de longitud de 500 caracteres"
        )
        .required("requerido"),
        unidadAdtva: Yup.string()
        .min(4, "La unidad administrativa debe de tener al menos una longitud de 4 caracteres")
        .max(
          500,
          "La unidad administrativa debe de tener un maximo de longitud de 500 caracteres"
        )
        .required("requerido"),
    }),
  });

  const setValues = useCallback(() => {
    if(data?.state?.data?.nombre && nombre===''){
        const asignarNombre = data?.state?.data?.nombre
        setNombre(asignarNombre);
        formik.setFieldValue('nombre', asignarNombre);
        setTimeout(() => formik.setFieldTouched('nombre', true));
    }
    if(data?.state?.data?.correo && correo===''){
      const asignarCorreo = data?.state?.data?.correo
      setCorreo(asignarCorreo);
      formik.setFieldValue('correo', asignarCorreo);
      setTimeout(() => formik.setFieldTouched('correo', true));
  }

  if(data?.state?.data?.extension && extension===''){
    const asignarExtension = data?.state?.data?.extension
    setExtension(asignarExtension);
    formik.setFieldValue('extension', asignarExtension);
    setTimeout(() => formik.setFieldTouched('extension', true));
}

if(data?.state?.data?.puesto && puesto===''){
  const asignarPuesto = data?.state?.data?.puesto
  setPuesto(asignarPuesto);
  formik.setFieldValue('puesto', asignarPuesto);
  setTimeout(() => formik.setFieldTouched('puesto', true));
}

if(data?.state?.data?.sede && sede===''){
  const asignarsede = data?.state?.data?.sede
  setSede(asignarsede);
  formik.setFieldValue('sede', asignarsede);
  setTimeout(() => formik.setFieldTouched('sede', true));
}

if(data?.state?.data?.ubicacion_piso && ubicacion===''){
  const asignarubicacion = data?.state?.data?.ubicacion_piso
  setUbicacion(asignarubicacion);
  formik.setFieldValue('ubicacion', asignarubicacion);
  setTimeout(() => formik.setFieldTouched('ubicacion', true));
}

if(data?.state?.data?.unidad_adtva && unidadAdtva===''){
  const asignarunidadAdtva = data?.state?.data?.unidad_adtva
  setUnidadAdtva(asignarunidadAdtva);
  formik.setFieldValue('unidadAdtva', asignarunidadAdtva);
  setTimeout(() => formik.setFieldTouched('unidadAdtva', true));
}
 
  
  
  
  
  

    
}, [data,nombre])

useEffectOnce(() =>  setValues() );

  return (
    <div style={{ width: "100%" }}>
      <FormikProvider value={formik}>
        <Form.Group className="mb-3 form-control " >
          <InputField
            required
            value={nombre}
            name="nombre"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("nombre", target?.value);
              setNombre(target?.value);
            }}
            label={"Nombre*"}
            placeholder="Escriba el nombre"
            type="text"
            id="nombre"
          />
          <InputField
            required
            value={correo}
            name="correo"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("correo", target?.value);
              setCorreo(target?.value);
            }}
            label={"Correo*"}
            placeholder="Escriba el correo"
            type="text"
            id="correo"
          />
          <InputField
            required
            value={extension}
            name="extension"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("extension", target?.value);
              setExtension(target?.value);
            }}
            label={"Extension*"}
            placeholder="Escriba la extension"
            type="text"
            id="extension"
          />
          <InputField
            required
            value={puesto}
            name="puesto"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("puesto", target?.value);
              setPuesto(target?.value);
            }}
            label={"Puesto*"}
            placeholder="Escriba el puesto"
            type="text"
            id="puesto"
          />
          <InputField
            required
            value={sede}
            name="sede"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("sede", target?.value);
              setSede(target?.value);
            }}
            label={"Sede*"}
            placeholder="Escriba la sede"
            type="text"
            id="sede"
          />
          <InputField
            required
            value={ubicacion}
            name="ubicacion"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("ubicacion", target?.value);
              setUbicacion(target?.value);
            }}
            label={"Ubicacion*"}
            placeholder="Escriba la ubicacion"
            type="text"
            id="ubicacion"
          />
          <InputField
            required
            value={unidadAdtva}
            name="unidadAdtva"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("unidadAdtva", target?.value);
              setUnidadAdtva(target?.value);
            }}
            label={"Unidad administrativa*"}
            placeholder="Escriba la unidad administrativa"
            type="text"
            id="unidadAdtva"
          />


          <InputField
            name="imagen"
            onInput={(e: any) => {
              const target = e.target as any;
              formik.setFieldValue("imagen", target?.value);
              setImagen(target?.files?.[0]);
            }}
            label={"Reemplazar la imagen Imagen*"}
            accept="image/png, image/gif, image/jpeg"
            placeholder=""
            type="file"
            id="imagen"
          />
          <h1>Imagen actual</h1>
          <Image thumbnail  src={data?.state?.data?.imagen}/>
          <br />
          <Button
            variant="primary"
            disabled={props?.procesando || !formik.dirty || !formik.isValid}
            onClick={() => {
              props?.enAccion({id:data?.state?.data?.id,nombre,correo,extension,puesto,sede,ubicacion,unidadAdtva,imagen,imagenUrl:data?.state?.data?.imagen});
            }}
          >
            Actualiza
          </Button>
        </Form.Group>
      </FormikProvider>
    </div>
  );
};

export default EmployeesEditForm;
