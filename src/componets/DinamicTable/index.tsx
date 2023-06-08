import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Image from "react-bootstrap/Image";
import FormAddImage from "./FormAddImage";
import Search from "../TableComponent/Search";
import { Button } from "react-bootstrap";

interface DinamicTableProps {
  data: any;
  titulo?: string;
  actions?: boolean;
  enAccion?: (accion: string, row: any,imagen:any) => void;
  enAccionGuardar?:()=> void
}


const DinamicTable: React.FC<DinamicTableProps> = (
  props: DinamicTableProps
) => {
  const [filterText, setFilterText] = useState<string>("");

  const tool = (row: any, x: any) => {
    return <p>{row?.[x] || ""}</p>;
  };

  const imagen = (row: any, x: any) => {
    return  (row?.[x] ? 
      <div className="row">
        <div className="col-12">
        <Image
    style={{ width:  '100px',   height: '100px', objectFit: 'cover' }}
    src={row?.[x] || ""}
    onLoad={() => {
        URL.revokeObjectURL(row?.[x] || "");
    }}
    />
        </div>
        {props?.enAccion ? <div className="col-12">
    
    <FormAddImage key={row?.nombre} reemplazar procesando={false} enAccion={(elemento)=>props?.enAccion && props?.enAccion('estableceImagen',row,elemento)} />
    </div> : null}
    </div>
     : props?.enAccion ? <FormAddImage key={row?.nombre} procesando={false} enAccion={(elemento)=>props?.enAccion && props?.enAccion('estableceImagen',row,elemento)} />: null);
  };

  const filteredItems = (props?.data || []).filter(
    (item: any) =>
      (item?.nombre &&
        (item?.nombre || "").toLowerCase().includes(filterText.toLowerCase())) ||
      (item?.correo &&
        (item?.correo || "")
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );;

  const keys = Object.keys(filteredItems?.[0] || {  });
  

  const columns: TableColumn<any>[] = keys
    .filter(
      (element: string) =>
        element !== "imagen_file"
    )
    .map((dta) => {
      return {
        name: dta,
        selector: (row:any) => row?.[dta] || "",
        cell: (row:any) => ( (dta === "imagen_archivoPreview") ? imagen(row, dta) :   tool(row, dta)   ),
      };
    });

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        textAlign:'center',
        justifyContent:'center',
        padding:'0',
        border:'solid 1px grey'
      },
      cells: {
        style: {
          backgroundColor: "blue",
          width: "100%",

        },
      },
    },
    rows: {
      style: {
        width: "100%",
        border:'solid 1px red'
      },
    },
  };

  const conditionalRowStyles:any = [
    {
      when: () => true,
      style: {
        fontWeight: "bold",
        textAlign:'center',
        justifyContent:'center',
        paddingTop:'5px',
        paddingBottom:'5px',
        border:'solid 1px grey'
      },
    },
  ];

  return (
    <div className={''}>
      <div className="row">
        <div className="col-12">
          <h3>{props?.titulo || ""}</h3>
        </div>
        <div className="col-6">
        {props?.data?.length && props?.enAccionGuardar ? (
            <Button
            style={{float:'right'}}
              size="lg"
              variant="primary"
              onClick={() => {
                props?.enAccionGuardar && props?.enAccionGuardar();
              }}
            >
              Guardar
            </Button>
          ) : null}
        </div>
        <div className="col-6">
        <Search
          filterText={filterText}
          setFilterTextAction={(filt: string) => setFilterText(filt)}
        />
          </div>
        <div className="col-12">
          <DataTable
            pagination
            paginationComponentOptions={{
              rowsPerPageText:  "table_filas_pagina" ,
              rangeSeparatorText: "de",
              selectAllRowsItem: true,
              selectAllRowsItemText: "Todos",
            }}
            conditionalRowStyles={conditionalRowStyles}
            columns={columns}
            customStyles={customStyles}
            
            data={(filteredItems || []).map( (element: any) => {
              return {
                correo : element?.correo,
                extension: element?.extension,
                imagen_archivoPreview: element?.imagen_archivoPreview,
                imagen_nombre: element?.imagen_nombre,
                nombre: element?.nombre,
                puesto: element?.puesto,
                sede: element?.sede,
                ubicacion_piso: element?.ubicacion_piso,
                unidad_adtva: element?.unidad_adtva
              }
            } )}
          />
        </div>
      </div>
    </div>
  );
};

export default DinamicTable;
