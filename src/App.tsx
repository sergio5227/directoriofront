import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import PrivateRouter from "./hocs/PrivateRouter";
import PublicRouter from "./hocs/PublicRoutes";
import EmployeesAddPage from "./pages/EmployeesAddPage";
import EmployeesPage from "./pages/EmployeesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import EmployeesEditPage from "./pages/EmployeesEditPage";
import AddMultiplePage from "./pages/addMultiplePage";

export default function App() {

  return (
    <>
      <Routes> 

      <Route path="/login" element={<PublicRouter path="/login"  />}>
          <Route path="/login" element={<LoginPage />} />
      </Route> 
      <Route path="/" element={<PublicRouter path="/login"  />}>
          <Route path="/login" element={<LoginPage />} />
      </Route> 
      <Route path="/" element={<PrivateRouter path="/login"  />}>
        <Route path="/directorio" element={<EmployeesPage />} />
        <Route path="/directorio-add-multiple" element={<AddMultiplePage />} />
        <Route path="/directorio-add" element={<EmployeesAddPage />} />
        <Route path="/directorio-edit" element={<EmployeesEditPage />} />
        </Route>
      <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}