import React from "react";
import Post from "../../components/post/Post";
import {useDispatch} from "react-redux";
import {onLogout} from "../../redux/actions/generalActions";

const FavoritesScreen = () => {
    const dispatch = useDispatch();
    // dispatch(onLogout())
    return(
        <div style={{marginTop:100}}>
            <Post/>
            <Post/>

        </div>
    )
}
export default FavoritesScreen;
