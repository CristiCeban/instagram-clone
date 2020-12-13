import {Dispatch} from "react";
import ApiService from '../../services/api'
import {ProductsActions} from "./productsActions";

export interface getProfileData {
    readonly type : 'GET_PROFILE_DATA'
    payload : any
}
export interface setProfileInProgress {
    readonly type : 'SET_PROFILE_IN_PROGRESS',
    payload : boolean,
}

export interface SetInProgressDeletingProduct {
    readonly type : 'SET_IN_PROGRESS_DELETING_PRODUCT'
    payload : {
        inProgress : boolean,
        id : number | undefined,
    }
}

export interface SetNewProductsProfile {
    readonly type : 'SET_NEW_PRODUCTS_PROFILE',
    payload : number
}

export type ProfileActions =
    | getProfileData
    | setProfileInProgress
    | SetInProgressDeletingProduct
    | SetNewProductsProfile

export const onGetProfileData = () => {
    return async (dispatch : Dispatch<ProfileActions>) => {
        try {
            dispatch({type:'SET_PROFILE_IN_PROGRESS',payload:true})
            const response = await ApiService.get('me',{});
            console.log(response)
            dispatch({type:'GET_PROFILE_DATA',payload:response})
        }
        catch (e) {
            console.log(e)
        }
        finally {
            dispatch({type:'SET_PROFILE_IN_PROGRESS',payload:false})
        }
    }
}

export const onDeleteProduct = (id : number) => {
    return async(dispatch : Dispatch<ProfileActions>) => {
        try{
            dispatch({type:'SET_IN_PROGRESS_DELETING_PRODUCT',payload:{inProgress:true,id}})
            const response = await ApiService.get(`products/delete/${id}`,{});
            setTimeout(() => dispatch({type:'SET_NEW_PRODUCTS_PROFILE',payload:id}),1000)
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setTimeout(() => dispatch({type:'SET_IN_PROGRESS_DELETING_PRODUCT',payload:{inProgress:false,id:undefined}}),1000)
        }
    }
}
