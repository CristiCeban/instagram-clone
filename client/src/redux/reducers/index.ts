import {combineReducers} from "redux";
import {AuthReducer} from "./authReducers";
import {routerReducer} from "react-router-redux";
import {ProfileReducer} from "./profileReducers";
import {ProductsReducer} from "./productsReducers";


const rootReducer = combineReducers({
    authReducer : AuthReducer,
    productsReducers : ProductsReducer,
    profileReducers:ProfileReducer,
    routing:routerReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>
export {rootReducer}
