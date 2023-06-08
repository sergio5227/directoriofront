import { useFormik, FormikProvider } from "formik";

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import InputField from "../InputField";
import { LoginFormProps } from "./types";

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      user: Yup.string()
        .min(
          4,
          "El usuario debe de tener al menos una longitud de 4 caracteres"
        )
        .max(
          50,
          "El usuario debe de tener un maximo de longitud de 50 caracteres"
        )
        .required("requerido"),
      password: Yup.string()
        .min(
          4,
          "El password debe de tener al menos una longitud de 4 caracteres"
        )
        .max(
          10,
          "El usuario debe de tener un maximo de longitud de 10 caracteres"
        )
        .required("requerido"),
    }),
  });

  return (
    <div style={{ width: "100%" }}>
      <FormikProvider value={formik}>
      <Form.Group className="mb-3 form-control " >

        <InputField
          required
          value={user}
          isProtected
          name="user"
          onInput={(e: any) => {
            const target = e.target as HTMLTextAreaElement;
            formik.setFieldValue("user", target?.value);
            setUser(target?.value);
          }}
          label={"Usuario*"}
          placeholder="ingrese el usuario"
          type="text"
          id="user"
        />

        <InputField
          required
          value={password}
          name="password"
          isProtected
          onInput={(e: any) => {
            const target = e.target as HTMLTextAreaElement;
            formik.setFieldValue("password", target?.value);
            setPassword(target?.value);
          }}
          label={"Contraseña*"}
          placeholder="Ingrese la contraseña"
          type="password"
          id="password"
        />
        <br/>
        <Button 
          variant="primary" 
          disabled={props?.procesando || !formik.dirty || !formik.isValid} 
          onClick={()=>{
            props?.enAccion({user,password});
          }}
        >
          Entrar
        </Button>
        </Form.Group>
      </FormikProvider>
    </div>
  );
};

export default LoginForm;
