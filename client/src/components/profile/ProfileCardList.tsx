import React from "react";
import {Container, Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import ProfileCardItem from "./ProfileCardItem";
import {makeStyles} from "@material-ui/core/styles";



const ProfileCardList = () => {
    const classes = useStyles();
    const {products} = useSelector((state:ApplicationState) => state.profileReducers)
    return(
        <div>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <div className={classes.line}/>
                    <Grid container spacing={4}>
                        {(products as any[]).map((card) => <ProfileCardItem key={card.product.id.toString()} card={card}/>)}
                    </Grid>
                </Container>
            </main>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    cardGrid: {
        // paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    line : {
        margin:'18px 0px',
        borderBottom:'1px solid grey',
    },
}));


export default ProfileCardList;
