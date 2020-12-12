import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useWindowDimensions from "../../hooks/useWindowDimenstions";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {onLogout} from "../../redux/actions/authActions";
import {persistor} from "../../redux/store";
import {ApplicationState} from "../../redux/reducers";
import Loader from 'react-loader-spinner';


const ProfileHeader = () => {
    const dispatch = useDispatch();
    const {height,width} = useWindowDimensions();
    const classes = useStyles({width,height})();
    const {inProgress,name,email,phone,products} = useSelector((state:ApplicationState) => state.profileReducers)

    const logout = async () => {
        await persistor.purge()
        dispatch(onLogout());
    }

    return(
        <div className={classes.mainDiv}>
            {inProgress ?
                <Loader type={'Rings'}/>
                :
                <>
                    <div className={classes.line}/>
                    <div className={classes.flexDiv}>
                        <div>
                            {/*// @ts-ignore*/}
                            <img className={classes.thumbnail} src={require('../../assets/temp.jpg')} alt={''}/>
                        </div>
                        <div className={classes.info}>
                            <h4>{name}</h4>
                            <h5>{email}</h5>
                            <h5>{phone}</h5>
                            <div className={classes.postsInfo}>
                                <h6>{products.length} Posts</h6>
                                <h6>0 Followers</h6>
                                <h6>0 Following</h6>
                            </div>
                            <Button onClick={logout}/>
                        </div>
                    </div>
                    <div className={classes.line}/>
                </>
            }
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
        width:160,
        height:160,
        borderRadius:80
    },
    line : {
        margin:'18px 0px',
        borderBottom:'1px solid grey',
    },
    postsInfo : {
        display:'flex',
        justifyContent:'space-between',
        width:'108%'
    }
}));
export default ProfileHeader;
