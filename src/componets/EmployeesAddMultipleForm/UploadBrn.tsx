import { useFormik, FormikProvider } from "formik";
import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import * as Yup from "yup";
import { UploadBrnProps } from "./types";
import DinamicTable from "../DinamicTable";

const UploadBrn: React.FC<UploadBrnProps> = (props: UploadBrnProps) => {

  const [show, setShow] = useState(true);
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({}),
  });

  return (
    <div style={{ width: "100%" }}>
      <FormikProvider value={formik}>
        <Form.Group className="mb-3 form-control ">
        <Alert
        dismissible
        show={show}
        onClose={() => setShow(false)}
        variant={"info"}
      >
        {" "}
          Por favor valide que su información este correcta, para finalizar de click en guardar y se guardara la información tal cual la visualiza en la siguiente tabla  
        {" "}
      </Alert>
          <DinamicTable
            enAccionGuardar={()=>{props?.enAccionGuardar();}}
            data={props?.data || []}
            enAccion={(accion, row, imagen) =>
              props?.enAccion && props?.enAccion(accion, row, imagen)
            }
          />
        </Form.Group>
      </FormikProvider>
    </div>
  );
};

export default UploadBrn;
