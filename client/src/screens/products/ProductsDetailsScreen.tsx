import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import ApiService from '../../services/api'
import {makeStyles} from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import Post from "../../components/post/Post";

export interface ProductPublicPostInterface {
    category: {
        id : number,
        name : string,
    }
    id : number,
    name : string,
    longDescription : string,
    shortDescription : string,
    price : number,
    photos: {
        id:number,
        imagePath:string}[],
    userId: {
        email : string,
        id : number,
        name : string,
        phone : string,
        userName : string
    }
}

const ProductDetailsScreen = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {pathname} = location;
    const classes = useStyles();


    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [product,setProduct] = useState<ProductPublicPostInterface>()

    useEffect( () => {
        (async () => {
            try{
                setIsLoading(true);
                const id = pathname.substring(pathname.lastIndexOf('/')+1)
                const response = await ApiService.get(`products/${id}`,{})
                console.log(response)
                setProduct(response)
            }
            catch (e) {

            }
            finally {
                setTimeout(() => setIsLoading(false),500)
            }
        })()
    },[pathname])
    return(
        isLoading && !product?
            <div className={classes.center}>
                <Loader type={'Puff'}/>
            </div>
            :
            <div style={{marginTop:100}}>
                <Post
                    name={product?.name}
                    category={product?.category}
                    id={product?.id}
                    longDescription={product?.longDescription}
                    photos={product?.photos}
                    price={product?.price}
                    shortDescription={product?.shortDescription}
                    userId={product?.userId}/>
            </div>

    )
}


const useStyles = makeStyles((theme) => ({
    center: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

export default ProductDetailsScreen
