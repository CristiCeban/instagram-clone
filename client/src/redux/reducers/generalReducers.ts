import {generalActions} from "../actions/generalActions";

type generalState = {
    rememberMe : boolean,
    isLoadingAllCategories : boolean,
    allCategories : any[],
}

const initialState = {
    rememberMe : false,
    isLoadingAllCategories:false,
    allCategories : []
}

const GeneralReducer = (state :generalState = initialState,action:generalActions) => {
    switch (action.type) {
        case "SET_REMEMBER_ME":
            return{
                ...state,
                rememberMe: action.payload
            }
        case "SET_LOADING_ALL_CATEGORIES":
            return{
                ...state,
                isLoadingAllCategories:action.payload
            }
        case "GET_ALL_CATEGORIES":
            return{
                ...state,
                allCategories:action.payload
            }
        default:
            return state
    }
}

export {GeneralReducer}
