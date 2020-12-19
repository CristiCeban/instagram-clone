import React, {useEffect, useState} from "react";
import {
    Container,
    Grid,
    IconButton,
    Modal,
    Backdrop,
    Fade,
    InputAdornment,
    MenuItem,
    Slider,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getProductsBySearch} from "../../redux/actions/productsActions";
import {ApplicationState} from "../../redux/reducers";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Colors";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingFooterIndicator from "../../components/product/LoadingFooterIndicator";
import ProfileForeignCardItem from "../../components/profile/ProfileForeignCardItem";
import {Autorenew, Close, FilterList} from "@material-ui/icons";
import {onGetAllCategories} from "../../redux/actions/generalActions";
import TextField from "@material-ui/core/TextField";


const ProductsScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {productsSearch,inProgressProductsSearch,productsSearchNextPage,search,
        productsSearchLastPage} = useSelector((state:ApplicationState) => state.productsReducers);

    const {isLoadingAllCategories,allCategories} = useSelector((state : ApplicationState) => state.generalReducers)

    const [open, setOpen] = React.useState(false);
    const [category,setSelectedCategory] = useState();
    const [newSearch,setNewSearch] = useState(0)

    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}°C`;
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCategory(undefined)
    };

    const handleRenew = () => {
        setOpen(false);
        setNewSearch((prev) => prev+1)
    }

    useEffect(() => {
        if(typeof category !== "number")
            dispatch(getProductsBySearch({search}))
        else
            dispatch(getProductsBySearch({search,categoryId:category},true,true))
    },[search,newSearch])

    useEffect(() => {
        dispatch(onGetAllCategories())
    },[])

    const refresh = () => {
        if(typeof category !== "number")
            dispatch(getProductsBySearch({search}))
        else
            dispatch(getProductsBySearch({search,categoryId:category},true,true))
    }

    const loadMore = () => {
        if(typeof category !== "number")
            dispatch(getProductsBySearch({search},false))
        else
            dispatch(getProductsBySearch({search,categoryId:category},false,true))
    }

    return(
        <div>
            {inProgressProductsSearch ?
                <div className={classes.center}>
                    <Loader type={'Puff'} color={Color.secondaryColor}/>
                </div>
                :
                <div style={{marginTop:100}}>
                    <div className={classes.filterIcon}>
                        <IconButton onClick={handleOpen}>
                            <FilterList width={20} height={20}/>
                        </IconButton>
                    </div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                {isLoadingAllCategories ?
                                    <Loader type={'Puff'} color={Color.secondaryColor}/>
                                :
                                    <>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="categoryId"
                                            label="category"
                                            select
                                            id="categoryId"
                                            InputLabelProps={{
                                                shrink: !isLoadingAllCategories,
                                            }}
                                            InputProps={{
                                                readOnly: isLoadingAllCategories,
                                                startAdornment: isLoadingAllCategories ? (
                                                    <InputAdornment position="start">
                                                        <Loader height={15} width={15} type={"Circles"} color={'#a50101'}/>
                                                    </InputAdornment>
                                                ) : null,
                                            }}
                                            value={category}
                                            onChange={(value: any) => setSelectedCategory(value.target.value)}
                                        >
                                            {allCategories.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Typography>Select price interval</Typography>
                                        <Slider
                                            value={value}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={valuetext}
                                        />
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <IconButton onClick={handleRenew}>
                                                <Autorenew/>
                                            </IconButton>
                                            <IconButton onClick={handleClose}>
                                                <Close/>
                                            </IconButton>
                                        </div>
                                    </>
                                }
                            </div>
                        </Fade>
                    </Modal>
                    <InfiniteScroll
                        next={loadMore}
                        hasMore={productsSearchNextPage<=productsSearchLastPage}
                        loader={<LoadingFooterIndicator/>}
                        dataLength={productsSearch.length}
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
                        <main style={{marginTop:-60}}>
                            <Container className={classes.cardGrid} maxWidth="md">
                                <Grid container spacing={4}>
                                    {productsSearch.map((card:any) =>
                                        <ProfileForeignCardItem card={card} key={card.product.id.toString()}/>)}
                                </Grid>
                            </Container>
                        </main>
                    </InfiniteScroll>
                </div>
            }
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    center: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    footer: {
        height : 200,
    },
    filterIcon: {
        left:'10%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



export default ProductsScreen;
