import * as React from "react";
import {Provider} from 'react-redux';
import Navigation from "./navigation/Navigation";
import {store} from "./redux/store";

export const App = () => {
    return (
        <Provider store={store}>
            <Navigation/>
        </Provider>
    )
}
