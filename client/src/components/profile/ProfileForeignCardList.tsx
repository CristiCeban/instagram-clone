import React from "react";
import ProfileForeignCardItem, {UserProducts} from "./ProfileForeignCardItem";
import {makeStyles} from "@material-ui/core/styles";
import {Container, Grid} from "@material-ui/core";

export interface ProfileForeignCardListInterface {
    userProductsList : UserProducts[];
}

const ProfileForeignCardList = ({userProductsList} : ProfileForeignCardListInterface) => {
    const classes = useStyles();


    return(
        <div>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <div className={classes.line}/>
                    <Grid container spacing={4}>
                        {userProductsList.map((card) =>
                            <ProfileForeignCardItem card={card}/>)}
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


export default ProfileForeignCardList;
