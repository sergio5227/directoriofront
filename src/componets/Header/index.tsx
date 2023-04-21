import React from "react";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
import { HeaderProps } from "./types";
import "./index.scss";
import { resetState } from "../../actions/auth";
import { useDispatch } from "react-redux";

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const search = useLocation().pathname;
  const dispatch = useDispatch();
  
  return (
    <Nav className="justify-content-center header-global">


      {!props?.inSession ? <Nav.Item>
        <Nav.Link disabled={search ==='/login' } href="#/login">Inicio de sesion</Nav.Link>
      </Nav.Item> : null}
      

      {props?.inSession ? <Nav.Item>
        <Nav.Link disabled={search ==='/dierctorio' } href="#/dierctorio">Directorio</Nav.Link>
      </Nav.Item> : null}

      {props?.inSession ? <Nav.Item>
        <Nav.Link  onClick={()=>dispatch(resetState())} >Cerrar sesion</Nav.Link>
      </Nav.Item> : null}

    </Nav>
  );
};

export default Header;
