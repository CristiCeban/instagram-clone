import {LoginModel} from "../types/authTypes";
import {Dispatch} from "react";
import ApiService from '../../services/api'

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
    payload : string,
}

export interface ErrorRegister {
    readonly type : 'ON_ERROR_REGISTER',
    payload : string,
}

export interface InProgress {
    readonly type : 'SET_IN_PROGRESS',
    payload : boolean,
}

export interface SetToken {
    readonly type : 'SET_TOKEN_AND_USER_TYPE',
    payload : any,
}

export interface RegisterAction {
    readonly type : 'ON_REGISTER'
    payload : any,
}

export type AuthActions =
    | LoginAction
    | LogoutAction
    | ErrorAction
    | ErrorRegister
    | InProgress
    | SetToken
    | RegisterAction

export const onLogin=(body : LoginModel) => {
    return async (dispatch : Dispatch<AuthActions>) =>{
        try {
            dispatch({type :'SET_IN_PROGRESS',payload:true})
            const response = await ApiService.post('authenticate', {...body})
            setTimeout(() => dispatch({type: 'ON_LOGIN', payload: response.data.token}),1500)
        }
        catch(e){
            console.error(e);
            dispatch({type:'ON_ERROR',payload:"Email or password doesn't match"})
        }
        finally {
            setTimeout(() => dispatch({type : 'SET_IN_PROGRESS',payload : false}),1500)
        }
    }
}

export const onRegister = (body : any) => {
    return async (dispatch : Dispatch<AuthActions>) => {
        try{
            dispatch({type :'SET_IN_PROGRESS',payload:true})
            const response = await ApiService.post('register', {...body})
            console.log(response)
            console.log(response.data);
            setTimeout(() => dispatch({type: 'ON_REGISTER', payload: response.data.token})
            ,1500)
        }
        catch (e) {
            console.log(e);
            dispatch({type:'ON_ERROR_REGISTER',payload:"This email is already taken"})
        }
        finally {
            setTimeout(() => dispatch({type : 'SET_IN_PROGRESS',payload : false}),1500)
        }
    }
}

