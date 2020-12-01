import {LoginModel} from "../types/authTypes";
import {Dispatch} from "react";

export interface UserModel {
    token : string,
    user_type_id : any,
}

export interface LoginAction {
    readonly type : 'ON_LOGIN',
    payload : UserModel,
}

export interface LogoutAction {
    readonly type : 'ON_LOGOUT',
    payload : undefined,
}

export interface ErrorAction {
    readonly type : 'ON_ERROR',
    payload : any,
}

export interface ErrorRegister {
    readonly type : 'ON_ERROR_REGISTER',
    payload : any,
}

export interface InProgress {
    readonly type : 'SET_IN_PROGRESS',
    payload : boolean,
}

export interface SetToken {
    readonly type : 'SET_TOKEN_AND_USER_TYPE',
    payload : any,
}

export type AuthActions =
    | LoginAction
    | LogoutAction
    | ErrorAction
    | ErrorRegister
    | InProgress
    | SetToken

export const onLogin=(body : LoginModel) => {
    return async (dispatch : Dispatch<AuthActions>) =>{
        try {
            dispatch({type :'SET_IN_PROGRESS',payload:true})
        }
        catch(e){
            console.error(e);
        }
        finally {
            // dispatch({type : 'SET_IN_PROGRESS',payload : false})
        }
    }
}

export const onLogout = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        dispatch({type:'ON_LOGOUT',payload:undefined})
    }
}
