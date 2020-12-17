import {ProductsActions} from "../actions/productsActions";

type ProductsState = {
    inProgress : boolean,
    inProgressProductsMain : boolean,
    inProgressLazyProductsMain : boolean,
    productsMain : any[],
    productsFavorite : any[],
    productsMainNextPage : number,
    productsMainLastPage : number,
}

const initialState = {
    inProgress : false,
    inProgressProductsMain : false,
    inProgressLazyProductsMain : false,
    productsMain : [],
    productsFavorite : [],
    productsMainNextPage : 0,
    productsMainLastPage : 0,
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
        case "GET_PRODUCTS_MAIN":
            if(action.payload.initialLoading)
                return {
                    ...state,
                    productsMain : action.payload.products,
                    productsMainNextPage : 1,
                    productsMainLastPage : parseInt(action.payload.totalPages) -1,
                }
            else {
                return {
                    ...state,
                    productsMain : [...state.productsMain,...action.payload.products],
                    productsMainNextPage : state.productsMainNextPage +1,
                    productsMainLastPage : parseInt(action.payload.totalPages) -1,
                }
            }
        default :
            return state
    }
}

export {ProductsReducer}
