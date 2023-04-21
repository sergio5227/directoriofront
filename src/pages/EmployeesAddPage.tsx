import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveEmployee } from '../actions/employees';
import EmployeesForm from '../componets/EmployeesForm';
import Header from '../componets/Header';

const EmployeesAddPage = () => {
  const navigate = useNavigate()
  const inSession = useSelector((state:any)=> state?.app?.user?.user || false  )
  const [procesando,setProcesando] = useState<boolean>(false);

  const addEmployee = async (elemento:any) => {
    try {
      setProcesando(true)
      const data1 = new FormData();
      data1.append("imagen", elemento?.imagen);
      data1.append("nombre", elemento?.nombre);
      data1.append("correo", elemento?.correo);
      data1.append("extension", elemento?.correo);
      data1.append("puesto", elemento?.puesto);
      data1.append("sede", elemento?.sede);
      data1.append("ubicacion_piso", elemento?.ubicacion);
      data1.append("unidad_adtva", elemento?.unidadAdtva);
      await saveEmployee(data1);
      

      setProcesando(false)
      alert('Registro creado exitosamente')
      navigate(`/dierctorio`)
    } catch (error) {
      alert(error)
      setProcesando(false)
    }
  }  


  return (
    <div>
      <Header inSession={inSession}/>
      <Container fluid>
        <EmployeesForm procesando={procesando} enAccion={(elemento)=>addEmployee(elemento)}/>
      </Container>
    </div>
  )
}

export default EmployeesAddPage;