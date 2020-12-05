import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
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


const Navigation = () => {
    const {isLogged} = useSelector((state: ApplicationState) => state.authReducer);
    return (
        <Router>
            {!isLogged ?
                <>
                    <Route exact path={'/'} component={AuthScreen}/>
                    <Route exact path={'/SignIn'} component={AuthScreen}/>
                    <Route exact path={'/SignUp'} component={RegisterScreen}/>
                </>
                :
                <>
                    <Route exact path={'/'} render={() =>(
                        !isLogged ?
                            <Redirect  to={'/SignIn'}/>
                        :
                            <>
                                <NavBar/>
                                <Route component={Main}/>
                            </>
                        )
                    }/>
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
                        !isLogged ?
                            <Redirect  to={'/SignIn'}/>
                            :
                            <>
                                <NavBar/>
                                <Route component={ProductsScreen}/>
                            </>
                    )
                    }/>

                    <Route exact path={'/favorites'} render={()=>(
                        !isLogged ?
                            <Redirect  to={'/SignIn'}/>
                            :
                            <>
                                <NavBar/>
                                <Route component={FavoritesScreen}/>
                            </>
                    )
                    }/>

                    <Route exact path={'/cart'} render={()=>(
                        !isLogged ?
                            <Redirect  to={'/SignIn'}/>
                            :
                            <>
                                <NavBar/>
                                <Route component={CartScreen}/>
                            </>
                    )
                    }/>

                    <Route exact path={'/profile'} render={()=>(
                        !isLogged ?
                            <Redirect  to={'/SignIn'}/>
                            :
                            <>
                                <NavBar/>
                                <Route component={ProfileScreen}/>
                            </>
                    )
                    }/>




                </>
            }
        </Router>
    )
}

export default Navigation
