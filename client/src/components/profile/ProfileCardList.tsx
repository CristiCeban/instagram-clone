import React, {useEffect} from "react";
import {Container, Grid} from "@material-ui/core";
import {onGetProfileData} from "../../redux/actions/profileActions";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import ProfileCardItem from "./ProfileCardItem";
import {makeStyles} from "@material-ui/core/styles";


const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const ProfileCardList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {products} = useSelector((state:ApplicationState) => state.profileReducers)
    useEffect(()=>{
        dispatch(onGetProfileData())
    },[])
    return(
        <div>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <div className={classes.line}/>
                    <Grid container spacing={4}>
                        {(products as any[]).map((card) => <ProfileCardItem  card={card}/>)}
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
