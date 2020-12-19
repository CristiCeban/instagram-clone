import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {Card, CardActions, CardContent, CardMedia, Grid, IconButton, Link, Typography} from "@material-ui/core";
import Config from "../../config/config";
import {Delete, Visibility} from "@material-ui/icons";
//@ts-ignore
import { autoPlay } from 'react-swipeable-views-utils';
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import Loader from "react-loader-spinner";
import {onDeleteProduct} from "../../redux/actions/profileActions";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface profileCardItemInterface {
    card : {
        product: {
            id: number,
            name: string,
            longDescription: string,
            shortDescription: string,
            price: number,
            category: {
                id: number,
                name: string
            }
            photos: any[]
        }
        liked : boolean
    }
}

const ProfileCardItem = ({card:{
    product : {
        id,
        price,
        photos,
        name,
        shortDescription,
        category},
    liked}} : profileCardItemInterface) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = photos.length;
    const {inProgressDeleting,deletingProductId} = useSelector((state : ApplicationState) => state.profileReducers)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    const onDeleteClicked = () => {
        dispatch(onDeleteProduct(id))
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
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
                                    title="Image title"
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>

                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                        Product's Name:{name}
                    </Typography>
                    <Typography variant='subtitle2' component='h6'>
                        Short Description:{shortDescription}
                    </Typography>
                    <Typography variant='button' paragraph component='h4'>
                        Price:{price}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <Button>
                        <Typography>#{category.name}</Typography>
                    </Button>
                    <Link href={`/products/${id}`}>
                        <IconButton aria-label="see">
                            <Visibility />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="share" className={classes.deleteIcon} onClick={onDeleteClicked}>
                        {deletingProductId === id ?
                            <Loader type={'ThreeDots'} height={24} width={24}/>
                            :
                            <Delete/>
                        }
                    </IconButton>
                </CardActions>
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
                    />
                    : null}
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    deleteIcon: {
        marginLeft: 'auto'
    }
}));


export default ProfileCardItem;
