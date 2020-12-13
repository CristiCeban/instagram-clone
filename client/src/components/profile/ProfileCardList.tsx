import React from "react";
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProfileCardItem from "./ProfileCardItem";


const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const ProfileCardList = () => {
    const classes = useStyles();
    return(
        <div>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <div className={classes.line}/>
                    <Grid container spacing={4}>
                        {cards.map((card,index) => <ProfileCardItem key={index.toString()}/>)}
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
