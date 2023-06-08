import { useFormik, FormikProvider } from "formik";
import React, { useState } from "react";
import { Alert, Button, Form, ProgressBar } from "react-bootstrap";
import * as Yup from "yup";
import InputField from "../InputField";
import { EmployeesAddMultipleFormProps } from "./types";
import * as XLSX from 'xlsx';
import { sleep } from "../../utils";

/* generate an array of column objects */

const EmployeesAddMultipleForm: React.FC<EmployeesAddMultipleFormProps> = (
  props: EmployeesAddMultipleFormProps
) => {
  const [file, setFile] = useState<any>(null);
  const [show, setShow] = useState(true);
  const [now,setNow] = useState<number>(0);
  const [label,setLabel] = useState<string>('');
  const [variant,setVariant] = useState<'danger'|'info'>('info');
  
  /* const make_cols = (refstr:any) => {
	let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
  }; */

  const formik = useFormik({
    initialValues: {
      file: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
      file: Yup.string().required("requerido"),
    }),
  });

  

  return (
    <div style={{ width: "100%" }}>
      
      <Alert dismissible show={show}  onClose={() => setShow(false)} variant={'info'}> <p style={{fontWeight:'bold'}}>Descargue <a href="/excel_file_ejemplo/EjemplolayoutCarga.xlsx" >aqui</a> el ejemplo del formato de archivo de excel necesario para que pueda comenzar</p> </Alert> 
      <FormikProvider value={formik}>
        <Form.Group className="mb-3 form-control ">
          <InputField
            required
            name="file"
            onInput={(e: any) => {
              const target = e.target as any;
              formik.setFieldValue("file", target?.value);
              setFile(target?.files?.[0]);
            }}
            label={"Seleccione el archivo de exel*"}
            placeholder=""
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            type="file"
            id="file"
          />
         {now > 0 &&  <ProgressBar now={now*10} label={label} variant={variant} />}
          <br />
          <Button
            variant="primary"
            disabled={props?.procesando || !formik.dirty || !formik.isValid}
            onClick={async () => {
                await sleep(500);
                setVariant('info');
                setNow(1)
                setLabel('validando archivo.');
                /* Boilerplate to set up FileReader */
                const reader = new FileReader();
                const rABS = !!reader.readAsBinaryString;
                await sleep(500);
                setNow(2)
                setLabel('validando archivo..');

              reader.onload = async (e:any) => {
                await sleep(500);
                setNow(3)
                setLabel('validando archivo...');
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {
                    type: rABS ? "binary" : "array",
                    bookVBA: true,
                });
                await sleep(500);
                setNow(4)
                setLabel('validando archivo');
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                await sleep(500);
                setNow(6)
                setLabel('validando archivo..');
                /* Convert array of arrays */
                const data_ = XLSX.utils.sheet_to_json(ws);
                await sleep(500);
                setNow(7)
                setLabel('validando archivo...');
                /* Update state */
                /* setCols(make_cols(ws["!ref"])) */
                await sleep(500);
                setNow(10)
                setLabel('archivo validado, informacion correcta');
                await sleep(500);
                props?.enAccion({ data_ });
              };
              if (rABS) {
                reader.readAsBinaryString(file);
              } else {
                reader.readAsArrayBuffer(file);
              }
            }}
          >
            Avanzar
          </Button>
        </Form.Group>
      </FormikProvider>
    </div>
  );
};

export default EmployeesAddMultipleForm;
