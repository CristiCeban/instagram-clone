import React from "react";
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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const PostItem = ({name,category,id,longDescription,photos,price,shortDescription,userId} : ProductPublicPostInterface) => {
    const classes = useStyles();
    const theme = useTheme();

    const [expanded, setExpanded] = React.useState(false);

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = photos.length;

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
                    <CardActions disableSpacing>
                        <Button>
                            <Typography>#{category.name}</Typography>
                        </Button>
                        <IconButton aria-label="add to favorites">
                            <Favorite />
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
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                minutes.
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don’t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>


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
