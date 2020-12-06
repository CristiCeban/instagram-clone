import * as React from "react";
import {Provider} from 'react-redux';
import Navigation from "./navigation/Navigation";
import {persistor, store} from "./redux/store";
import {createBrowserHistory} from 'history';
import {PersistGate} from "redux-persist/integration/react";

const history = createBrowserHistory({basename : 'insta-clone'})

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Navigation history={history}/>
            </PersistGate>
        </Provider>
    )
}
