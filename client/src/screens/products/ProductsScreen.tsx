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
    Typography, InputBase, Checkbox
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
import {Autorenew, Close, FilterList, Refresh} from "@material-ui/icons";
import {onGetAllCategories} from "../../redux/actions/generalActions";
import TextField from "@material-ui/core/TextField";
import ApiService from '../../services/api'
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router";


interface SortBy {
    id : number,
    label : string,
}

const sortedValue = [{id : 0,label : 'Descendent'},{id : 1,label : 'Ascendant'}]

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const location = useLocation();
    const navigation = useHistory();
    const {productsSearch,inProgressProductsSearch,productsSearchNextPage,search,
        productsSearchLastPage} = useSelector((state:ApplicationState) => state.productsReducers);

    const {isLoadingAllCategories,allCategories} = useSelector((state : ApplicationState) => state.generalReducers)

    const [sortBy,setSortBy] = useState<SortBy>(sortedValue[0])

    const [open, setOpen] = React.useState(false);
    const [isCheckBox,setCheckBox] = React.useState<boolean>(false)
    const [category,setSelectedCategory] = useState<number | undefined>(undefined);
    const [newSearch,setNewSearch] = useState(0)

    const [value, setValue] = React.useState<number[]>([0, 50]);
    const [price,setPrice] = React.useState<number[]>([0,100]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}`;
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
        (async() => {
            const response = await ApiService.get('products/price',{});
            setPrice([response.minPrice,response.maxPrice])
        })()

    },[])

    useEffect(() => {
        if((location?.state?.category || location?.state?.category ===0 )&& location?.state?.category!==category) {
            console.log('s-a intrat')
            const state = { ...navigation?.location?.state };
            delete state.category;
            navigation.replace({ ...navigation.location, state });
            setSelectedCategory(location?.state?.category)
            dispatch(getProductsBySearch({search, categoryId: location?.state?.category}, true, true))
        } else {
            let payload = {}
            if (search)
                payload = Object.assign({search}, payload);
            if (isCheckBox) {
                let min, max;
                if (value[0] < value[1]) {
                    min = value[0]
                    max = value[1]
                } else {
                    min = value[1]
                    max = value[0]
                }
                payload = Object.assign({priceStart: min}, payload)
                payload = Object.assign({priceEnd: max}, payload)
            }
            if (sortBy === 0 || sortBy === 1) {
                payload = Object.assign({sort: sortBy}, payload)
            }
            console.log(payload)
            if (typeof category !== "number")
                dispatch(getProductsBySearch(payload))
            else
                dispatch(getProductsBySearch({...payload, categoryId: category}, true, true))
        }
    },[search,newSearch])

    useEffect(() => {
        dispatch(onGetAllCategories())
    },[])

    const refresh = () => {

        if(typeof category !== "number")
            dispatch(getProductsBySearch(search))
        else
            dispatch(getProductsBySearch({search,categoryId:category},true,true))
    }

    const handleRefresh = () => {
        setSelectedCategory(undefined);
        setOpen(false);
        setSortBy(sortedValue[0])
        dispatch(getProductsBySearch({search}))
    }
    const loadMore = () => {
        if(typeof category !== "number")
            dispatch(getProductsBySearch({search,page : productsSearchNextPage},false))
        else
            dispatch(getProductsBySearch({search,page : productsSearchNextPage,categoryId:category},false,true))
    }

    const changeRangeSecond = (e : any) => {
        const target = e.target.value;
        if(!e || !e?.target || !e?.target?.value)
            console.log('asa')
        else
        {
            console.log(target)
            if(parseInt(target) < 0)
                setValue(prev => [prev[0],0])
            else if(parseInt(e.target.value) > price[1])
                setValue(prev => [prev[0],price[1]])
            else
                setValue(prev => [prev[0], parseInt(target)])
        }
    }

    const changeRangeFirst = (e : any) => {
        const target = e.target.value;
        if(!e || !e?.target || !e?.target?.value)
            console.log('asa')
        else
        {
            if(parseInt(target) < 0)
                setValue(prev => [0,prev[0]])
            else if(parseInt(e.target.value) > price[1])
                setValue(prev => [price[1],prev[0]])
            else
                setValue(prev => [parseInt(target),prev[0]])
        }
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

                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="categoryId"
                                            label="Sort"
                                            select
                                            id="sortId"
                                            value={sortBy}
                                            onChange={(value: any) => setSortBy(value.target.value)}
                                        >
                                            {sortedValue.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        <div style={{display:'flex',justifyContent:'row'}} >
                                            <Checkbox
                                                checked={isCheckBox}
                                                onChange={(e) => setCheckBox(e.target.checked)}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                aria-label={'Select price Interval'}
                                            />
                                            <Typography style={{marginTop:10}}>Select price interval</Typography>
                                        </div>
                                        <Slider
                                            disabled={!isCheckBox}
                                            value={value}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={valuetext}
                                            max={price[1]}
                                            min={price[0]}
                                        />
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <InputBase
                                                type={'number'}
                                                placeholder={'Min Price'}
                                                value={value[0]}
                                                onChange={changeRangeFirst}
                                            />
                                            <InputBase
                                                type={'number'}
                                                placeholder={'Max Price'}
                                                value={value[1]}
                                                onChange={changeRangeSecond}
                                            />
                                        </div>

                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <IconButton onClick={handleRenew}>
                                                <Autorenew/>
                                            </IconButton>
                                            <IconButton onClick={handleRefresh}>
                                                <Refresh/>
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
        float:'right'
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
