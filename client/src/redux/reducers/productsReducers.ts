import {ProductsActions} from "../actions/productsActions";

type ProductsState = {
    inProgress : boolean
}

const initialState = {
    inProgress : false,
}

const ProductsReducer = (state : ProductsState = initialState,action : ProductsActions) => {
    switch (action.type) {
        case "SET_IN_PROGRESS_PRODUCT":
            return {
                ...state,
                inProgress : action.payload
            }
        default :
            return state
    }
}

export {ProductsReducer}
