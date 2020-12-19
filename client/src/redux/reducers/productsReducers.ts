import {ProductsActions} from "../actions/productsActions";

type ProductsState = {
    inProgress : boolean,
    inProgressProductsMain : boolean,
    inProgressLazyProductsMain : boolean,
    productsMain : any[],
    productsMainNextPage : number,
    productsMainLastPage : number,
    inProgressAddingToWish : boolean,
    addingIdToWishList: number | undefined,
    productsFavorite : any[],
    productsFavoriteNextPage : number,
    productsFavoriteLastPage : number,
    inProgressFavoritesProducts : boolean,
    inProgressFavoritesProductsLazy : boolean,
}

const initialState = {
    inProgress : false,
    inProgressProductsMain : false,
    inProgressLazyProductsMain : false,
    productsMain : [],
    productsFavorite : [],
    productsMainNextPage : 0,
    productsMainLastPage : 0,
    inProgressAddingToWish: false,
    addingIdToWishList : undefined,
    inProgressFavoritesProducts : false,
    inProgressFavoritesProductsLazy : false,
    productsFavoriteNextPage : 0,
    productsFavoriteLastPage : 0,
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


        default :
            return state
    }
}

export {ProductsReducer}
