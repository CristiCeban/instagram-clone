import React, {useEffect} from "react";
import Post from "../../components/post/Post";
import {onGetProductsMain} from "../../redux/actions/productsActions";
import {useDispatch} from "react-redux";


const Main = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(onGetProductsMain())
    },[])
        return (
                <div style={{marginTop:100}}>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            )
}

export default Main;
