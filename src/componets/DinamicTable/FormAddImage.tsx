import { useFormik, FormikProvider } from "formik";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import InputField from "../InputField";
import { FormAddImageProps } from "./types";

const FormAddImage: React.FC<FormAddImageProps> = (
  props: FormAddImageProps
) => {
  const [imagen, setImagen] = useState<any>(null);
  const formik = useFormik({
    initialValues: {
      imagen: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
        imagen: Yup.string()
        .required("requerido"),
    }),
  });

  return (
    <div style={{ width: "100%" }}>
      <FormikProvider value={formik}>
        <Form.Group className="mb-3 form-control ">
          
          <InputField
            required
            name="imagen"
            onInput={(e: any) => {
              const target = e.target as any;
              formik.setFieldValue("imagen", target?.value);
              setImagen(target?.files?.[0]);
            }}
            label={""}
            placeholder=""
            accept="image/png, image/gif, image/jpeg"
            type="file"
            id="imagen"
          />

          <br />
          <Button
            size="sm"
            variant={props?.reemplazar ? 'warning' : 'primary'}
            disabled={props?.procesando || !formik.dirty || !formik.isValid}
            onClick={() => {
              props?.enAccion({imagen});
            }}
          >
            {props?.reemplazar ? 'Cambiar' : 'Agregar'}
          </Button>
        </Form.Group>
      </FormikProvider>
    </div>
  );
};

export default FormAddImage;
