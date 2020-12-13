import {Dispatch} from "react";

export interface LogoutReset {
    readonly type : 'USER_LOGOUT_RESET',
    payload : undefined,
}

export interface RememberMe {
    readonly type : 'SET_REMEMBER_ME',
    payload : boolean
}

export type generalActions =
    | LogoutReset
    | RememberMe


export const onLogout = () => {
    return async(dispatch : Dispatch<generalActions>) => {
        dispatch({type:'USER_LOGOUT_RESET',payload:undefined})
    }
}

export const onRememberMe = (payload : boolean) => {
    return async(dispatch: Dispatch<generalActions>) => {
        dispatch({type:'SET_REMEMBER_ME',payload})
    }
}
