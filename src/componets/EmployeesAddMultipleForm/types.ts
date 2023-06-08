export interface EmployeesAddMultipleFormProps {
    procesando?:boolean
    enAccion:(elemento:any)=> void
    tipo?:string
}

export interface UploadBrnProps {
    enAccion:(accion: string, row: any,imagen:any)=> void
    enAccionGuardar:()=> void
    data?:any[]
}

export interface DragAndDropFieldProps {
    onAction:(files:any[])=>void
    data?:any[]
}