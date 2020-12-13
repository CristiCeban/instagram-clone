import {combineReducers} from "redux";
import {AuthReducer} from "./authReducers";
import {routerReducer} from "react-router-redux";
import {ProfileReducer} from "./profileReducers";
import {ProductsReducer} from "./productsReducers";
import storage from "redux-persist/lib/storage";
import {GeneralReducer} from "./generalReducers";


const appReducer  = combineReducers({
    authReducer : AuthReducer,
    generalReducers : GeneralReducer,
    productsReducers : ProductsReducer,
    profileReducers:ProfileReducer,
    routing:routerReducer,
})


const rootReducer = (state : any, action:any) => {
    if (action.type === 'USER_LOGOUT_RESET') {
        state = undefined
        storage.removeItem('persist:root')
    }

    return appReducer(state, action)
}

export type ApplicationState = ReturnType<typeof rootReducer >
export {rootReducer}
