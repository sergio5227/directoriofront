import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginHttp, setUser } from "../actions/auth";
import Header from "../componets/Header";
import LoginForm from "../componets/LoginForm";
import { LoginAction } from "../componets/LoginForm/types";
import { StoreType } from "../types/geericTypes";


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [procesando,setProcesando] = useState<boolean>(false);
  const inSession = useSelector((state:StoreType)=> state?.app?.user?.user || ''  )

  const login = async (data:LoginAction) => {
    try {
      setProcesando(true)
      const user = await loginHttp(data);
      dispatch(setUser(user));
      setProcesando(false)
      navigate(`/dierctorio`)
    } catch (error) {
      alert(error)
      setProcesando(false)
    }
  } 
  return (
    <div>
      <Header inSession={inSession ? true : false} />
      <Container fluid>
        <LoginForm procesando={procesando} enAccion={login}/>
      </Container>
    </div>
  );
};

export default LoginPage;
