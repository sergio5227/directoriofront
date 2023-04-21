import axios from "axios";

import { EmployeesType } from "../componets/TableComponent/types";
import { GeneralHttpResponse } from "../types/geericTypes";

export const SET_EMPLOYEES = "@SET_EMPLOYEES";
export const REMOVE_DETAIL = "@REMOVE_DETAIL";

export const setEmployees = (employees: EmployeesType[]) => {
  return {
    type: SET_EMPLOYEES,
    value: employees,
  };
};

export const removeDetail = () => {
  return {
    type: REMOVE_DETAIL,
  };
};

export const getEmployees = async () => {
  try {
    const response: GeneralHttpResponse = await axios.get(
      `${"http://127.0.0.1:8000/api/todosElementos"}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((resolve, reject) => reject(error));
    return promise;
  }
};


export const editEmployee = async (data:any) => {
  try {
    const response: GeneralHttpResponse = await axios.post(
      `${"http://127.0.0.1:8000/api/actualizaElemento/"}${data?.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    const promise = new Promise((resolve, reject) => reject(error));
    return promise;
  }
};

export const saveEmployee = async (data:any) => {
  try {
    const response: GeneralHttpResponse = await axios.post(
      `${"http://127.0.0.1:8000/api/altaElemento"}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    const promise = new Promise((resolve, reject) => reject(error));
    return promise;
  }
};


export const elimina = async (id:any) => {
  try {
    const response: GeneralHttpResponse = await axios.post(
      `${"http://127.0.0.1:8000/api/eliminaElemento/"}${id}`
    );
    return response?.data || [];
  } catch (error) {
    const promise = new Promise((resolve, reject) => reject(error));
    return promise;
  }
};