export interface EmployeesType {
  id?: number;
  name: string;
  last_name: string;
  birthday: number;
}

export interface TableComponentProps {
  data: EmployeesType[]
  onAction:(action:string,data:any)=> void
}

export interface paginationProps {
    elemenmtos:number
    onPage:(page:number)=> void
  }
  
  