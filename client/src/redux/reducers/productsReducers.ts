import {ProductsActions} from "../actions/productsActions";

type ProductsState = {
    inProgress : boolean,
    inProgressAddingToWish : boolean,
    addingIdToWishList: number | undefined,
    search : string,

    inProgressProductsMain : boolean,
    inProgressLazyProductsMain : boolean,
    productsMain : any[],
    productsMainNextPage : number,
    productsMainLastPage : number,

    productsFavorite : any[],
    productsFavoriteNextPage : number,
    productsFavoriteLastPage : number,
    inProgressFavoritesProducts : boolean,
    inProgressFavoritesProductsLazy : boolean,

    productsSearch : any[],
    inProgressProductsSearch : boolean,
    inProgressProductsLazySearch : boolean,
    productsSearchNextPage : number,
    productsSearchLastPage : number

}

const initialState = {
    inProgress : false,
    inProgressAddingToWish: false,
    addingIdToWishList : undefined,
    search : '',

    inProgressProductsMain : false,
    inProgressLazyProductsMain : false,
    productsMain : [],
    productsMainNextPage : 0,
    productsMainLastPage : 0,

    productsFavorite : [],
    inProgressFavoritesProducts : false,
    inProgressFavoritesProductsLazy : false,
    productsFavoriteNextPage : 0,
    productsFavoriteLastPage : 0,

    productsSearch : [],
    inProgressProductsSearch : false,
    inProgressProductsLazySearch : false,
    productsSearchNextPage : 0,
    productsSearchLastPage : 0
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
        case "GET_FAVORITES_PRODUCTS":
            if(action.payload.initialLoading)
                return {
                    ...state,
                    productsFavorite : action.payload.products,
                    productsFavoriteNextPage : 1,
                    productsFavoriteLastPage : parseInt(action.payload.totalPages) -1,
                }
            else {
                return{
                    ...state,
                    productsFavorite : [...state.productsFavorite,...action.payload.products],
                    productsFavoriteNextPage : state.productsFavoriteNextPage +1,
                    productsFavoriteLastPage : parseInt(action.payload.totalPages) -1
                }
            }
        case "SET_IN_PROGRESS_ADDING_TO_WISH":
            return {
                ...state,
                inProgressAddingToWish : action.payload.inProgress,
                addingIdToWishList : action.payload.id
            }
        case "DELETE_PRODUCT_FROM_WISH":
            if(state.productsFavorite.some(el => el.product.id === action.payload))
                return {
                    ...state,
                    productsFavorite : state.productsFavorite.filter((el : any) => el.product.id !==action.payload)
                }
            else{
                return {
                    ...state,
                }
            }
        case "SET_IN_PROGRESS_PRODUCTS_FAVORITES":
            return {
                ...state,
                inProgressFavoritesProducts : action.payload
            }
        case "SET_IN_PROGRESS_PRODUCTS_FAVORITES_LAZY":
            return {
                ...state,
                inProgressFavoritesProductsLazy : action.payload
            }
        case "SET_IN_PROGRESS_PRODUCTS_SEARCH":
            return {
                ...state,
                inProgressProductsSearch : action.payload,
            }
        case "SET_IN_PROGRESS_PRODUCTS_LAZY_SEARCH":
            return {
                ...state,
                inProgressProductsLazySearch : action.payload
            }
        case "GET_PRODUCTS_BY_SEARCH":
            if(action.payload.initialLoading)
                return {
                    ...state,
                    productsSearch : action.payload.products,
                    productsSearchNextPage : 1,
                    productsSearchLastPage : parseInt(action.payload.totalPages) -1,
                }
            else {
                return{
                    ...state,
                    productsSearch : [...state.productsSearch,...action.payload.products],
                    productsSearchNextPage : state.productsSearchNextPage +1,
                    productsSearchLastPage : parseInt(action.payload.totalPages) -1
                }
            }
        case "SEARCH_CHANGED":
            return {
                ...state,
                search : action.payload
            }

        default :
            return state
    }
}

export {ProductsReducer}
