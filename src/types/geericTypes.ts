import { LoginAction } from "../componets/LoginForm/types";
import { EmployeesType } from "../componets/TableComponent/types";

export interface HttpResponse {
    success:boolean,
    data:{
        employees :EmployeesType[]
    }
}

export interface GeneralHttpResponse {
    config: any
    data: HttpResponse
    headers: any
    request: any
    status: number
    statusText: string
    }


export interface EmployeesTypes {
    data:EmployeesType[]
}

export interface AppType {
    user:LoginAction,
    employees:EmployeesTypes
    upload:string[]
}

export interface StoreType {
   app: AppType
}