import React, {useEffect} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {onGetProductsMain} from "../../redux/actions/productsActions";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import {makeStyles} from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import LoadingFooterIndicator from "../../components/product/LoadingFooterIndicator";
import {Color} from "../../config/Colors";
import PostItem from "../../components/post/PostItem";


const Main = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const {productsMain,inProgressProductsMain,productsMainNextPage,
        productsMainLastPage} = useSelector((state:ApplicationState) => state.productsReducers);

    useEffect(() => {
        dispatch(onGetProductsMain())
    },[])

    const refresh = () => {
        dispatch(onGetProductsMain())
    }
    const loadMore = () => {
        dispatch(onGetProductsMain({page:productsMainNextPage},false))
    }

    return (
        <div>
            {inProgressProductsMain ?
                <div className={classes.center}>
                    <Loader type={'Puff'} color={Color.secondaryColor}/>
                </div>
                :
                <InfiniteScroll
                    next={loadMore}
                    hasMore={productsMainNextPage<=productsMainLastPage}
                    loader={<LoadingFooterIndicator/>}
                    dataLength={productsMain.length}
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
                    {productsMain.map(({product,liked} : any) => {
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
                                favoriteScreen={false}
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
}));

export default Main;
