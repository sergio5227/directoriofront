import { LoginAction } from "../componets/LoginForm/types";

export const SET_USER = "@SET_USER";
export const RESET_STATE = "@RESET_STATE";

export const setUser = (user: LoginAction) => {
  return {
    type: SET_USER,
    value: user,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
};


export const loginHttp = async (user: LoginAction): Promise<any> => {
  try {
    if(user?.user !== 'admin'   ||  user?.password !== 'admin'){
      const promise = new Promise((resolve, reject) => reject('usuario o contraseña invalidos'));
      return promise;
    }
    const response = new Promise((resolve, reject) => resolve({user:user?.user,password:user?.password}));
    return response
  } catch (error) {
    const promise = new Promise((resolve, reject) => reject(error));
    return promise;
  }
};




