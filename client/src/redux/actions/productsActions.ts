import {Dispatch} from "react";
import ApiService from '../../services/api'


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

export const onUploadProduct = (values : any) => {
    return async(dispatch : Dispatch<ProductsActions>) => {
        try {
            dispatch({type:'SET_IN_PROGRESS_PRODUCT',payload:true})
            console.log(values)
            const response = ApiService.post('products/add',values)
            console.log(values)
        }
        catch (e) {

        }
        finally {
            dispatch({type:'SET_IN_PROGRESS_PRODUCT',payload:false})
        }
    }
}
