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
            dispatch({type: 'ON_LOGIN', payload: response.data.token})
        }
        catch(e){
            console.error(e);
        }
        finally {
            dispatch({type : 'SET_IN_PROGRESS',payload : false})
        }
    }
}

export const onRegister = (body : any) => {
    return async (dispatch : Dispatch<AuthActions>) => {
        try{
            dispatch({type :'SET_IN_PROGRESS',payload:true})
            setTimeout(async () => {
                const response = await ApiService.post('register', {...body})
                console.log(response)
                console.log(response.data);
                dispatch({type: 'ON_REGISTER', payload: response.data.token})
            },3000)
        }
        catch (e) {
            console.log('error')
            console.log(e);
        }
        finally {
            setTimeout(() => dispatch({type : 'SET_IN_PROGRESS',payload : false}),3000)
        }
    }
}

export const onLogout = () => {
    return async (dispatch: Dispatch<AuthActions>) => {
        dispatch({type:'ON_LOGOUT',payload:undefined})
    }
}
