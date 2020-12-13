import React, {useEffect} from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import {useDispatch, useSelector} from "react-redux";
import {onGetProfileData} from "../../redux/actions/profileActions";
import ProfileCardList from "../../components/profile/ProfileCardList";
import {makeStyles} from "@material-ui/core/styles";
import {ApplicationState} from "../../redux/reducers";
import Loader from "react-loader-spinner";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const {inProgress} = useSelector((state:ApplicationState) => state.profileReducers);
    const classes = useStyles();

    useEffect(()=>{
        dispatch(onGetProfileData())
    },[])
    return(
        <>
            {inProgress ?
                <div className={classes.center}>
                    <Loader type={'Puff'}/>
                </div>
                :
                <>
                    <ProfileHeader/>
                    <ProfileCardList/>
                </>
            }

        </>
    )
}

const useStyles = makeStyles((theme) => ({
    center: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));
export default ProfileScreen;
