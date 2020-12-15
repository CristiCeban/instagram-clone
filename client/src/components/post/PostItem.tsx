import React from "react";
import {Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import {AccountCircle, MoreHoriz} from "@material-ui/icons";
import Config from "../../config/config";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import {ProductPublicPostInterface} from "../../screens/products/ProductsDetailsScreen";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const PostItem = ({name,category,id,longDescription,photos,price,shortDescription,userId} : ProductPublicPostInterface) => {
    const classes = useStyles();
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = photos.length;

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
                            Name:{name}
                        </Typography>
                        <Typography>
                            Price:{price}:LEI
                        </Typography>
                        <Typography>
                            {shortDescription}
                        </Typography>
                        <Typography>
                            {longDescription}
                        </Typography>
                    </CardContent>



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
                </Card>
            </Grid>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    mainDiv:{
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
}));


export default PostItem
