import React, {useState} from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia, Collapse,
    Grid,
    IconButton,
    Link,
    Typography,
} from "@material-ui/core";
import clsx from 'clsx';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import {MoreHoriz, ExpandMore, Favorite} from "@material-ui/icons";
import Config from "../../config/config";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import {ProductPublicPostInterface} from "../../screens/products/ProductsDetailsScreen";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import {addToFavorite, deleteFromFavorite} from "../../redux/actions/productsActions";
import {Color} from "../../config/Colors";
import Loader from "react-loader-spinner";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const PostItem = ({name,category,id,longDescription,photos,price,shortDescription,userId,liked,favoriteScreen} : ProductPublicPostInterface) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const {inProgressAddingToWish,addingIdToWishList} = useSelector((state: ApplicationState) => state.productsReducers)
    const [isLiked,setLiked] = useState<boolean>(liked)

    const [expanded, setExpanded] = React.useState(false);

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = photos.length;

    const addToWishList = () => {
        !isLiked ? dispatch(addToFavorite(id)) : dispatch(deleteFromFavorite(id));
        if(!favoriteScreen)
            setLiked(!isLiked)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.mainDiv}>
            <Grid item xs={11} sm={9} md={8} style={{margin:"0px auto"}}>
                <Card className={classes.card}>
                    <div className={classes.cardHeader}>
                        <div className={classes.detailDiv}>
                            <Link href={`/profile/${userId?.id}`}>
                                <IconButton>
                                    <img className={classes.thumbnail} src={userId.imagePath ? `${Config.sourceUrl}/${userId?.imagePath}` : require('../../assets/placeholder.svg')}/>
                                </IconButton>
                            </Link>
                            <p>{userId?.userName}</p>
                        </div>
                        <IconButton>
                            <MoreHoriz/>
                        </IconButton>
                    </div>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {photos.map((step, index) => (
                            <div key={step.id}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={`${Config.sourceUrl}/${step.imagePath}`}
                                        // image={step.imgPath}
                                        title="Image title"
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant='h5' component='h2'>
                            Product:{name}
                        </Typography>
                        <Typography>
                            Price:{price}:LEI
                        </Typography>
                        <Typography>
                            {shortDescription}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button>
                            <Typography>#{category.name}</Typography>
                        </Button>
                        <IconButton aria-label="add to favorites" onClick={addToWishList} disabled={inProgressAddingToWish&&addingIdToWishList == id}>
                            {addingIdToWishList == id ?
                                <Loader type={'TailSpin'} color={Color.secondaryColor} width={24} height={24}/>
                                :
                                <Favorite color={isLiked ? 'secondary' : 'inherit'}/>
                            }
                        </IconButton>

                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMore />
                        </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                Description:{longDescription}
                            </Typography>
                            <div style={{display:'flex',justifyContent:'space-between'}} >
                                <Typography paragraph variant='subtitle1' component='h4'>
                                    {userId?.name}
                                </Typography>
                                <Typography paragraph>
                                    {userId?.email}
                                </Typography>
                                <Typography paragraph>
                                    {userId?.phone}
                                </Typography>
                            </div>
                        </CardContent>
                    </Collapse>

                    {photos.length > 1 ?
                        <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    /> : null}
                </Card>
            </Grid>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    mainDiv:{
        marginTop:100,
        marginBottom:100,
        margin:'0px auto',
    },
    cardHeader: {
        display : 'flex',
        flexDirection: 'row',
        justifyContent : 'space-between'
    },
    detailDiv: {
        display : 'flex',
        flexDirection: 'row',
    },
    card: {
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    thumbnail: {
        width: 25,
        height:25,
        borderRadius:35,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));


export default PostItem
