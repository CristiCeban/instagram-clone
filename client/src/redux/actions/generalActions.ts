import {Dispatch} from "react";
import ApiService from '../../services/api'

export interface LogoutReset {
    readonly type : 'USER_LOGOUT_RESET',
    payload : undefined,
}

export interface RememberMe {
    readonly type : 'SET_REMEMBER_ME',
    payload : boolean
}

export interface GetAllCategories {
    readonly type : 'GET_ALL_CATEGORIES'
    payload : any[]
}

export interface setLoadingAllCategories {
    readonly type: 'SET_LOADING_ALL_CATEGORIES',
    payload : boolean,
}

export type generalActions =
    | LogoutReset
    | RememberMe
    | GetAllCategories
    | setLoadingAllCategories


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

export const onGetAllCategories = () => {
    return async(dispatch: Dispatch<generalActions>) => {
        try{
            dispatch({type:'SET_LOADING_ALL_CATEGORIES',payload:true})
            const response = await ApiService.get('categories',{})
            console.log(response)
            dispatch({type:'GET_ALL_CATEGORIES',payload:response.data})
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setTimeout(() =>dispatch({type:'SET_LOADING_ALL_CATEGORIES',payload:false}),1000)
        }
    }
}
