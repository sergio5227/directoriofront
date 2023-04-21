import { combineReducers } from "redux";
import { RESET_STATE,SET_USER } from "../actions/auth";
import { SET_EMPLOYEES } from "../actions/employees";
import { SET_UPLOAD } from "../actions/uploads";

const appReducer = (state: any = {app: {user:{},employees:{data:[],detail:{}},upload:[]}}, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...{user:(action?.value || {})} };
    case SET_EMPLOYEES:
      return { ...state, ...{ employees:{  data:(action?.value || [])}} };
    case SET_UPLOAD: 
    return  { ...state, ...{ upload:  [...(state?.upload || []), action?.value]  }};
    case RESET_STATE:
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
