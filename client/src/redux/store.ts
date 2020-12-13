import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {rootReducer } from "./reducers";
import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key : 'root',
    storage : storage,
    blacklist :['navigation']
}

const persistedReducer = persistReducer(persistConfig,rootReducer );

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk,logger))
)

const persistor = persistStore(store);

export {store,persistor}
