import {ProductsActions} from "../actions/productsActions";

type ProductsState = {
    inProgress : boolean,
    inProgressProductsMain : boolean,
    inProgressLazyProductsMain : boolean,

}

const initialState = {
    inProgress : false,
    inProgressProductsMain : false,
    inProgressLazyProductsMain : false
}

const ProductsReducer = (state : ProductsState = initialState,action : ProductsActions) => {
    switch (action.type) {
        case "SET_IN_PROGRESS_PRODUCT":
            return {
                ...state,
                inProgress : action.payload
            }
        case "SET_IN_PROGRESS_PRODUCTS_MAIN":
            return {
                ...state,
                inProgressProductsMain:action.payload
            }
        case "SET_IN_PROGRESS_LAZY_PRODUCTS_MAIN":
            return {
                ...state,
                inProgressLazyProductsMain : action.payload,
            }
        default :
            return state
    }
}

export {ProductsReducer}
