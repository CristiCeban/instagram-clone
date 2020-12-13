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


export type ProductsActions =
    | UploadProduct
    | SetInProgressProduct


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
            setTimeout(() => dispatch({type:'SET_IN_PROGRESS_PRODUCT',payload:false}),1000)
        }
    }
}


