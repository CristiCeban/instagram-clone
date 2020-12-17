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

export type ProductsActions =
    | UploadProduct
    | SetInProgressProduct
    | GetProductsMain
    | SetInProgressProductsMain
    | SetInProgressLazyProductsMain


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
