import React from "react";
import {useDispatch} from "react-redux";
import {onLogout} from "../../redux/actions/authActions";

const ProfileScreen = () => {
    const dispatch = useDispatch()
    dispatch(onLogout());
    return(
        <>
            <h1>Profile</h1>
        </>
    )
}

export default ProfileScreen;
