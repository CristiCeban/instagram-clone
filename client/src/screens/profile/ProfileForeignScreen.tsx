import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {useLocation} from "react-router-dom";
import ApiService from "../../services/api";
import Loader from "react-loader-spinner";
import {makeStyles} from "@material-ui/core/styles";
import ProfileForeignHeader from "../../components/profile/ProfileForeignHeader";
import ProfileForeignCardList from "../../components/profile/ProfileForeignCardList";
import {onGetProfileData} from "../../redux/actions/profileActions";
import {ApplicationState} from "../../redux/reducers";
import {Color} from "../../config/Colors";

export interface ProfileInterface {
    profile:{
        email : string,
        id : number,
        name : string,
        phone : string,
        userName : string,
        imagePath : string,
    }
    userProducts : {
        category : {
            id : number,
            name : string,
        },
        id : number,
        longDescription : string,
        name : string,
        price : number,
        shortDescription : string,
        photos : {
            id : number,
            imagePath : string,
        }
        userId : {
            id : number,
            userName : string,
            email : string,
            phone : string,
            name : string,
            imagePath : string,
        }
    }[]
}

const ProfileForeignScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const {pathname} = location;
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [profile,setProfile] = useState<ProfileInterface>()
    const {id} = useSelector((state:ApplicationState) => state.profileReducers)

    useEffect(()=>{
        dispatch(onGetProfileData())
    },[])

    useEffect( () => {
        if(id)
            (async () => {
                try{
                    setIsLoading(true);
                    const idUser = pathname.substring(pathname.lastIndexOf('/')+1)
                    if(id==idUser)
                        history.replace('/profile')
                    else {
                        const response = await ApiService.get(`profile/${idUser}`, {})
                        setProfile(response)
                    }
                }
                catch (e) {
                    history.replace('/pageNotFound')
                }
                finally {
                    setTimeout(() => setIsLoading(false),500)
                }
            })()
    },[pathname,id])

    return(
        isLoading?
            <div className={classes.center}>
                <Loader type={'Puff'} color={Color.secondaryColor}/>
            </div>
            :
            <div>
                <ProfileForeignHeader
                    userName={profile?.profile.userName}
                    name={profile?.profile.name}
                    email={profile?.profile.email}
                    phone={profile?.profile.phone}
                    productsLength={profile?.userProducts.length}
                    imagePath = {profile?.profile?.imagePath}
                />
                <ProfileForeignCardList
                    userProductsList={profile?.userProducts}
                />
            </div>
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

export default ProfileForeignScreen;
