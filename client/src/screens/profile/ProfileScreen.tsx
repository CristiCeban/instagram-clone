import React, {useEffect} from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import {useDispatch} from "react-redux";
import {onGetProfileData} from "../../redux/actions/profileActions";

const ProfileScreen = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(onGetProfileData())
    },[])
    return(
        <>
            <ProfileHeader/>
            <h1>Profile</h1>
        </>
    )
}

export default ProfileScreen;
