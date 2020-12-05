import React from "react";
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import AuthScreen from "../screens/auth/AuthScreen";
import {useSelector} from "react-redux";
import {ApplicationState} from "../redux/reducers";
import Main from "../screens/main/Main";
import NavBar from "../components/navBar/NavBar";
import RegisterScreen from "../screens/auth/RegisterScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";


const Navigation = () => {
    const {isLogged} = useSelector((state: ApplicationState) => state.authReducer);
    return (
        <Router>
            {!isLogged ?
                <>
                    <Route component={AuthScreen}/>
                </>
                :
                <>
                    <Route exact path={'/'} render={() =>(
                        !isLogged ?
                            <Route component={AuthScreen}/>
                        :
                            <>
                                <NavBar/>
                                <Route component={Main}/>
                            </>
                        )
                    }/>
                    <Route exact path={'/signIn'} render={() =>(
                        !isLogged ?
                            <Route component={AuthScreen}/>
                            :
                            <>
                                <NavBar/>
                                <Route component={Main}/>
                            </>
                    )
                    }/>
                    <Route exact path={'/signUp'} render={()=>(
                        !isLogged ?
                            <Route component={RegisterScreen}/>
                            :
                            <>
                                <NavBar/>
                                <Route component={Main}/>
                            </>
                    )
                    }/>
                    <Route exact path={'/favorites'} render={()=>(
                        !isLogged ?
                            <Route component={AuthScreen}/>
                            :
                            <>
                                <NavBar/>
                                <Route component={FavoritesScreen}/>
                            </>
                    )
                    }/>
                    <Route exact path={'/profile'} render={()=>(
                        !isLogged ?
                            <Route component={AuthScreen}/>
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
