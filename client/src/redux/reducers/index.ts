import {combineReducers} from "redux";
import {AuthReducer} from "./authReducers";
import {routerReducer} from "react-router-redux";


const rootReducer = combineReducers({
    authReducer : AuthReducer,
    routing:routerReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>
export {rootReducer}
