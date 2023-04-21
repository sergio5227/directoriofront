export interface LoginAction {
    user:string
    password:string
}
export interface LoginFormProps {
    procesando:boolean
    enAccion: (data: LoginAction) => void;
}