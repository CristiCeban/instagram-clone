import {Dispatch} from "react";
import ApiService from '../../services/api'
import {UploadProductType} from "../types/productTypes";
import {createUploadProductFormData} from "../../functions/createFormData";

export interface UploadProduct {
    readonly type : 'UPLOAD_PRODUCT'
    payload : any,
}

export interface SetInProgressProduct {
    readonly type : 'SET_IN_PROGRESS_PRODUCT'
    payload : boolean,
}

export interface GetProductsMain {
    readonly type : 'GET_PRODUCTS_MAIN'
    payload : any,
}

export interface SetInProgressProductsMain {
    readonly type : 'SET_IN_PROGRESS_PRODUCTS_MAIN',
    payload : boolean,
}

export interface SetInProgressLazyProductsMain {
    readonly type : 'SET_IN_PROGRESS_LAZY_PRODUCTS_MAIN',
    payload : boolean,
}

export interface AddProductToWish {
    readonly type: 'SET_PRODUCT_TO_WISH',
    payload : number,
}

export interface SetInProgressAddingToWish {
    readonly type : 'SET_IN_PROGRESS_ADDING_TO_WISH',
    payload : {
        id:number | undefined,
        inProgress : boolean,
    }
}

export interface DeleteProductFromWish {
    readonly type : 'DELETE_PRODUCT_FROM_WISH',
    payload: {
        id : number | undefined,
        inProgress : boolean,
    }
}

export type ProductsActions =
    | UploadProduct
    | SetInProgressProduct
    | GetProductsMain
    | SetInProgressProductsMain
    | SetInProgressLazyProductsMain
    | AddProductToWish
    | DeleteProductFromWish
    | SetInProgressAddingToWish


export const onUploadProduct = (values : UploadProductType) => {
    return async(dispatch : Dispatch<ProductsActions>) => {
        try {
            dispatch({type:'SET_IN_PROGRESS_PRODUCT',payload:true})
            console.log(values)
            const formData = createUploadProductFormData(values);
            const response = await ApiService.postFormData('products/add',formData)
            console.log(response)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setTimeout(() => dispatch({type:'SET_IN_PROGRESS_PRODUCT',payload:false}),1500)
        }
    }
}

export const onGetProductsMain = (params:any = {},initialLoading = true) =>{
    const param = {page : 0,size:5};
    params = Object.assign(param,params)
    const loadingType = initialLoading ? 'SET_IN_PROGRESS_PRODUCTS_MAIN' : 'SET_IN_PROGRESS_LAZY_PRODUCTS_MAIN'
    return async(dispatch : Dispatch<ProductsActions>) => {
        try {
            dispatch({type:loadingType,payload:true})
            const response = await ApiService.getWithBody('products',params);
            const payload = {
                ...response,
                initialLoading,
            }
            setTimeout(() => dispatch({type:'GET_PRODUCTS_MAIN',payload:payload}),1500)
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setTimeout(() =>dispatch({type:loadingType,payload:false}),1500)
        }
    }

}

export const addToFavorite = (id : number) => {
    return async(dispatch : Dispatch<ProductsActions>) => {
        try{
            dispatch({type:'SET_IN_PROGRESS_ADDING_TO_WISH',payload : {id,inProgress:true}})
            const formData = new FormData();
            formData.append('productId',id.toString())
            const response = await ApiService.postFormData('products/wish',formData)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setTimeout(() =>dispatch({type:'SET_IN_PROGRESS_ADDING_TO_WISH',payload : {id:undefined,inProgress:false}}),1000)
        }
    }
}

export const deleteFromFavorite = (id : number) => {
    return async(dispatch : Dispatch<ProductsActions>) => {
        try{
            dispatch({type:'SET_IN_PROGRESS_ADDING_TO_WISH',payload : {id,inProgress:true}})
            const response = ApiService.get(`products/wish/delete/${id}`,{})
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setTimeout(() =>dispatch({type:'SET_IN_PROGRESS_ADDING_TO_WISH',payload : {id:undefined,inProgress:false}}),1000)
        }
    }
}


