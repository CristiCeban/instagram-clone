import {AuthActions} from "../actions/authActions";

type AuthState = {
    inProgress : boolean,
    isLogged : boolean,
    token : string | undefined,
    userType : string | undefined,
    error : string | undefined,
    errorRegister : any,
}

const initialState = {
    inProgress : false,
    isLogged : false,
    token : undefined,
    userType : undefined,
    error : undefined,
    errorRegister : undefined,
}

const AuthReducer = (state : AuthState = initialState,action : AuthActions) => {
    switch (action.type) {
        case 'ON_LOGIN' :
            return {
                ...state,
                token:action.payload.token,
                isLogged : true,
            }
        case "ON_LOGOUT":
            return {
                ...state,
                token : undefined,
                inProgress: false,
                isLogged: false,
            }
        case "SET_IN_PROGRESS":
            return {
                ...state,
                inProgress : action.payload
            }
        default :
            return state;
    }
}

export {AuthReducer}
