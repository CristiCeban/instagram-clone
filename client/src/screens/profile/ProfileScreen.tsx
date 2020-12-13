import React, {useEffect} from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import {useDispatch} from "react-redux";
import {onGetProfileData} from "../../redux/actions/profileActions";
import ProfileCardList from "../../components/profile/ProfileCardList";
import {makeStyles} from "@material-ui/core/styles";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(()=>{
        dispatch(onGetProfileData())
    },[])
    return(
        <>
            <ProfileHeader/>
            <ProfileCardList/>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    line : {
        margin:'18px 0px',
        borderBottom:'1px solid grey',
    },
}));
export default ProfileScreen;
