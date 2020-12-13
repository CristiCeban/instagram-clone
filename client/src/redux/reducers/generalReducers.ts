import {generalActions} from "../actions/generalActions";

type generalState = {
    rememberMe : boolean,
}

const initialState = {
    rememberMe : false,
}

const GeneralReducer = (state :generalState = initialState,action:generalActions) => {
    switch (action.type) {
        case "SET_REMEMBER_ME":
            return{
                ...state,
                rememberMe: action.payload
            }
        default:
            return state
    }
}

export {GeneralReducer}
