import React from "react";
import {
    Router,
    Route,
    Redirect, Switch
} from 'react-router'
import AuthScreen from "../screens/auth/AuthScreen";
import {useSelector} from "react-redux";
import {ApplicationState} from "../redux/reducers";
import Main from "../screens/main/Main";
import NavBar from "../components/navBar/NavBar";
import RegisterScreen from "../screens/auth/RegisterScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProductsScreen from "../screens/products/ProductsScreen";
import PageNotFound from "../screens/pageNotFound/PageNotFound";


const Navigation = ({history} : any) => {
    const {isLogged} = useSelector((state: ApplicationState) => state.authReducer);
    return (
        <Router history={history}>
            <Switch>
                {!isLogged ?
                    <Switch>
                        <Route exact path={'/'} component={AuthScreen}/>
                        <Route exact path={'/SignIn'} component={AuthScreen}/>
                        <Route exact path={'/SignUp'} component={RegisterScreen}/>
                        <Route path={'/*'} component={() => <Redirect to={'signIn'}/>}/>
                    </Switch>

                    :

                    <Switch>
                        <Route exact path={'/'} render={() =>(
                            <>
                                <NavBar/>
                                <Route component={Main}/>
                            </>)}
                        />
                        <Route exact path={'/signIn'} render={() =>(
                            !isLogged ?
                                <Route component={AuthScreen} />
                                :
                                <Redirect to={'/'}/>
                        )
                        }/>
                        <Route exact path={'/signUp'} render={()=>(
                            !isLogged ?
                                <Route component={RegisterScreen} />
                                :
                                <Redirect to={'/'}/>
                        )
                        }/>

                        <Route exact path={'/products'} render={()=>(
                            <>
                                <NavBar/>
                                <Route component={ProductsScreen}/>
                            </>)}
                        />

                        <Route exact path={'/favorites'} render={()=>(
                            <>
                                <NavBar/>
                                <Route component={FavoritesScreen}/>
                            </>)}
                        />

                        <Route exact path={'/cart'} render={()=>(
                            <>
                                <NavBar/>
                                <Route component={CartScreen}/>
                            </>)}
                        />

                        <Route exact path={'/profile'} render={()=>(
                            <>
                                <NavBar/>
                                <Route component={ProfileScreen}/>
                            </>)}
                        />

                    </Switch>
                }
                <Route path={'/*'} component={PageNotFound}/>
            </Switch>
        </Router>
    )
}

export default Navigation
