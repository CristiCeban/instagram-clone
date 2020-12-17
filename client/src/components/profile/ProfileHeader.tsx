import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useWindowDimensions from "../../hooks/useWindowDimenstions";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import {onLogout} from "../../redux/actions/generalActions";
import {IconButton, Typography} from "@material-ui/core";
import {Edit, ExitToApp} from "@material-ui/icons";
import {useHistory} from "react-router";



const ProfileHeader = () => {
    const dispatch = useDispatch();
    const navigation = useHistory();
    const {height,width} = useWindowDimensions();
    const classes = useStyles({width,height})();
    const {name,email,phone,products,userName} = useSelector((state:ApplicationState) => state.profileReducers)

    const logout = async () => {
        dispatch(onLogout());
    }

    return(
        <div className={classes.mainDiv}>
            <div className={classes.line}/>
            <div className={classes.flexDiv}>
                <div>
                    {/* @ts-ignore*/}
                    <img className={classes.thumbnail} src={require('../../assets/temp.jpg')} alt={''}/>
                </div>
                <div className={classes.info}>
                    <div className={classes.userName}>
                        <Typography style={{marginTop:0}} variant={'h4'}>{userName}</Typography>
                        <IconButton onClick={() => navigation.push('/profile/edit')}>
                            <Edit/>
                        </IconButton>
                        <IconButton onClick={logout}>
                            <ExitToApp/>
                        </IconButton>
                    </div>
                    <h4>{name}</h4>
                    <h5>{email}</h5>
                    <h5>{phone}</h5>
                    <h6>{products.length} Posts</h6>
                </div>
            </div>
        </div>
    )
}

const useStyles = ({width=0,height=0} : any) => makeStyles(() => ({
    mainDiv:{
        marginTop:65,
        maxWidth:650,
        margin:'0px auto',
        // backgroundColor:'#eeeeee',
    },
    flexDiv:{
        display:'flex',
        justifyContent:'space-around',
    },
    info : {
        marginLeft:-150
    },
    thumbnail:{
        marginTop:10,
        width:220,
        height:220,
        borderRadius:220
    },
    line : {
        margin:'18px 0px',
        borderBottom:'1px solid grey',
    },
    postsInfo : {
        display:'flex',
        justifyContent:'space-between',
        width:'108%'
    },
    userName: {
        display:'flex',
        justifyContent:'space-between',
        width:'108%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textModal:{
        color:'white'
    }
}));
export default ProfileHeader;
