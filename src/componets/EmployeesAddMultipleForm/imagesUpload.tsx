import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useDropzone } from "react-dropzone";
import "./index.scss";
import { DragAndDropFieldProps } from "./types";

const DragAndDropField = (props: DragAndDropFieldProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const [show, setShow] = useState(true);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles([]);
      acceptedFiles.map((file: any) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const dato = Object.assign(
            file,
            {
              preview: URL.createObjectURL(file),
              fileImage: event.target.result,
            },
            {}
          );
          setFiles((oldArray) => [...oldArray, dato]);
        };
        reader.readAsDataURL(file);
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
          fileImage: "",
        });
      });
    },
  });

  const thumbs = files.map((file: any) => {
    const imagenEncontrada = (props?.data || []).find((e: any) => {
      return e?.["NOMBRE FOTO IMAGEN"] === file.name;
    });
    return (
      <div className="col-3" key={file.name}>
        <Image
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        {imagenEncontrada ? (
          <p style={{ wordWrap: "break-word" }}>{file.name}</p>
        ) : (
          <div style={{ width: "100%" }}>
            <Alert variant={"danger"}>
              {" "}
              <p style={{ fontWeight: "bold" }}>
                Este archivo no se encuentra en los nombres de archivo del
                documento de excel y SERA OMITIDO
              </p>{" "}
            </Alert>
            <p style={{ wordWrap: "break-word", color: "red" }}>{file.name} </p>
          </div>
        )}
      </div>
    );
  });

  return (
    <section className="container">
      <Alert
        dismissible
        show={show}
        onClose={() => setShow(false)}
        variant={"info"}
      >
        {" "}
        <p style={{ fontWeight: "bold" }}>
          Los nombres de los archivos (imagenes) deben de existir en el archivo
          de excel que se adjunto en el paso anterior, para seguir ejemplo del archivo de excel anterior descargue 
          la imagen de ejemplo <a target="_blank" download href="/excel_file_ejemplo/ejemplo_nombre_de_imagen.jpg" >aqui</a>
        </p>{" "}
      </Alert>
      <div className="drag-zone" {...getRootProps()}>
        <input {...getInputProps()} />
        {!acceptedFiles?.length ? (
          <h5>
            Arrastre hasta aqui las imagenes de los usuarios, o de click para
            seleccionar los archivos
          </h5>
        ) : (
          <h5>
            Arrastre hasta aqui las imagenes de los usuarios, o de click para
            reemplazar los archivos seleccionados
          </h5>
        )}
      </div>
      {acceptedFiles?.length ? (
        <div
          className="row"
          style={{ width: "100%", textAlign: "center", paddingTop: "20px" }}
        >
          <h6>Vista previa de las imagenes cargadas</h6>
        </div>
      ) : null}

      {acceptedFiles?.length ? (
        <div className="row" style={{ width: "100%", padding: "20px" }}>
          {thumbs}
        </div>
      ) : null}

      {acceptedFiles?.length ? (
        <div className="row" style={{ padding: "20px" }}>
          <Button
            variant="primary"
            disabled={!acceptedFiles?.length}
            onClick={() => {
              props?.onAction(files);
            }}
          >
            Sigueinte
          </Button>
        </div>
      ) : null}
    </section>
  );
};

export default DragAndDropField;
