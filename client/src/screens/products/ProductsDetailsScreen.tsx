import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import ApiService from '../../services/api'
import {makeStyles} from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import PostItem from "../../components/post/PostItem";
import {useHistory} from "react-router";
import {Color} from "../../config/Colors";

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
    liked : boolean,
    photos: {
        id:number,
        imagePath:string}[],
    userId: {
        imagePath: string;
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
    const history = useHistory()
    const {pathname} = location;
    const classes = useStyles();


    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [product,setProduct] = useState<ProductPublicPostInterface>(null)
    const [isLiked,setLiked] = useState<boolean>(false)

    useEffect( () => {
        (async () => {
            try{
                setIsLoading(true);
                const id = pathname.substring(pathname.lastIndexOf('/')+1)
                const response = await ApiService.get(`products/${id}`,{})
                console.log(response)
                setProduct(response.product)
                setLiked(response.liked)
            }
            catch (e) {
                history.replace('/pageNotFound')
            }
            finally {
                setTimeout(() => setIsLoading(false),500)
            }
        })()
    },[pathname])
    return(
        isLoading?
            <div className={classes.center}>
                <Loader type={'Puff'} color={Color.secondaryColor}/>
            </div>
            :
            <div style={{marginTop:100}}>
                <PostItem
                    name={product?.name}
                    category={product?.category}
                    id={product?.id}
                    longDescription={product?.longDescription}
                    photos={product?.photos}
                    price={product?.price}
                    shortDescription={product?.shortDescription}
                    userId={product?.userId}
                    liked={isLiked}
                />
            </div>


            // <div style={{marginTop:100}}>
            //     <Post
            //         name={product?.name}
            //         category={product?.category}
            //         id={product?.id}
            //         longDescription={product?.longDescription}
            //         photos={product?.photos}
            //         price={product?.price}
            //         shortDescription={product?.shortDescription}
            //         userId={product?.userId}/>
            // </div>

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
