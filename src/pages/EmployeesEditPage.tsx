import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editEmployee } from '../actions/employees';
import Header from '../componets/Header';
import EmployeesEditForm from '../componets/EmployeesForm/edit';

const EmployeesEditPage = () => {
  const navigate = useNavigate()
  const inSession = useSelector((state:any)=> state?.app?.user?.user || false  )
  const [procesando,setProcesando] = useState<boolean>(false);

  const editEmploye = async (elemento:any) => {
    try {
      setProcesando(true)
      
      const data1 = new FormData();
      data1.append("id", elemento?.id);
      data1.append("imagen", elemento?.imagen);
      data1.append("nombre", elemento?.nombre);
      data1.append("correo", elemento?.correo);
      data1.append("extension", elemento?.extension);
      data1.append("puesto", elemento?.puesto);
      data1.append("sede", elemento?.sede);
      data1.append("ubicacion_piso", elemento?.ubicacion);
      data1.append("unidad_adtva", elemento?.unidadAdtva);
      data1.append("imagenurl", elemento?.imagenUrl);  
      await editEmployee(data1);
      setProcesando(false)
      alert('Registro actualizado exitosamente')
      navigate(`/directorio`)
    } catch (error) {
      alert(error)
      setProcesando(false)
    }
  }  


  return (
    <div>
      <Header inSession={inSession}/>
      <Container fluid>
        <EmployeesEditForm procesando={procesando} enAccion={(elemento)=>editEmploye(elemento)}/>
      </Container>
    </div>
  )
}

export default EmployeesEditPage;