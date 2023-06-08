import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { StoreType } from "../types/geericTypes";

interface PublicRouterProps {
  path: string;
}

const PublicRouter: React.FC<PublicRouterProps> = (
  props: PublicRouterProps
) => {
  const inSession = useSelector((state:StoreType)=> state?.app?.user?.user || false  )
  return  !inSession ? <Outlet /> : <Navigate to={'/directorio'} />;
  
};

export default PublicRouter;