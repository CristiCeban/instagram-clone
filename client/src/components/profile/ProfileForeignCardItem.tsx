import React, {useState} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Card, CardActions, CardContent, CardMedia, Grid, IconButton, Link, Typography} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from 'react-swipeable-views-utils';
import {useDispatch} from "react-redux";
import Config from "../../config/config";
import Button from "@material-ui/core/Button";
import {AccountCircle, Delete, Favorite, MoreHoriz, Visibility} from "@material-ui/icons";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface UserProducts {
    name : string,
    longDescription : string,
    shortDescription : string,
    price : number,
    id : number,
    category : {
        id: number,
        name: string,
    },
    photos: {
        id : number,
        imagePath : string,
    }[],
    userId : {
        id : number,
        userName : string,
        email : string,
        phone : string,
        name : string,
    }
}

const ProfileForeignCardItem = ({name,longDescription,shortDescription,price,id,category,photos,userId} : UserProducts) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = photos.length


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    return(
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <div className={classes.cardHeader}>
                    <div className={classes.detailDiv}>
                        <IconButton>
                            <AccountCircle/>
                        </IconButton>
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
                    {photos.map((step,index) =>(
                        <div key={step.id}>
                            {Math.abs(activeStep - index) <=2 ? (
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={`${Config.sourceUrl}/${step.imagePath}`}
                                    title='Image Title'
                                />
                            ): null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>

                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {name}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {shortDescription}
                    </Typography>
                    <Typography variant='button'>
                        {price}
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
                    <IconButton aria-label="share" className={classes.likeIcon}>
                        <Favorite/>
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
    )

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
    likeIcon: {
        marginLeft: 'auto'
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
}));


export default ProfileForeignCardItem;