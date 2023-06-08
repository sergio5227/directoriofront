import { FormikProvider, useFormik } from "formik";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import InputField from "../InputField";

interface filterTextProps {
  filterText: string;
  setFilterTextAction: (value: string) => void;
}

const Search = (props: filterTextProps) => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const handleClear = () => {
    if (props?.filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      props?.setFilterTextAction("");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      
    },
  });
  return (
    <div style={{  paddingBottom:'15px' }}>
      <FormikProvider value={formik}>
      
        <Form.Group className="form-control ">
          <InputField
            required
            value={props?.filterText}
            name="name"
            onInput={(e: any) => {
              const target = e.target as HTMLTextAreaElement;
              formik.setFieldValue("name", target?.value);
              props?.setFilterTextAction(target?.value);
              if (target?.value === "") {
                handleClear();
              }
            }}
            placeholder="Buscar..."
            type="text"
            id="name"
          />
        </Form.Group>
      </FormikProvider>
    </div>
  );
};

export default Search;
