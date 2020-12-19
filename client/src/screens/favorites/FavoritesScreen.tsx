import React, {useEffect} from "react";
import Post from "../../components/post/Post";
import {useDispatch, useSelector} from "react-redux";
import {onGetProductsFavorites, onGetProductsMain} from "../../redux/actions/productsActions";
import {ApplicationState} from "../../redux/reducers";
import {makeStyles} from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Colors";
import LoadingFooterIndicator from "../../components/product/LoadingFooterIndicator";
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../../components/post/PostItem";

const FavoritesScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {productsFavorite,inProgressFavoritesProducts,productsFavoriteLastPage,
        productsFavoriteNextPage} = useSelector((state:ApplicationState) => state.productsReducers);

    useEffect(() => {
        dispatch(onGetProductsFavorites())
    },[])

    const refresh = () => {
        dispatch(onGetProductsFavorites())
    }
    const loadMore = () => {
        dispatch(onGetProductsFavorites({page:productsFavoriteLastPage},false))
    }
    return(
        <div style={{marginTop:100}}>
            {inProgressFavoritesProducts ?
                <div className={classes.center}>
                    <Loader type={'Puff'} color={Color.secondaryColor}/>
                </div>
            :
                <InfiniteScroll
                    next={loadMore}
                    hasMore={productsFavoriteNextPage<=productsFavoriteLastPage}
                    loader={<LoadingFooterIndicator/>}
                    dataLength={productsFavorite.length}
                    refreshFunction={refresh}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                >
                    {productsFavorite.map(({product,liked} : any) => {
                        return(
                            <PostItem
                                key={product.id.toString()}
                                category={product.category}
                                id={product.id}
                                name={product.name}
                                longDescription={product.longDescription}
                                shortDescription={product.shortDescription}
                                price={product.price}
                                photos={product.photos}
                                userId={product.userId}
                                liked={liked}
                                favoriteScreen={true}
                            />
                        )
                    })}

                </InfiniteScroll>
            }

        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    center: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    footer: {
        height : 200,
    }
}));
export default FavoritesScreen;
