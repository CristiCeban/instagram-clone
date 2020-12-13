import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useWindowDimensions from "../../hooks/useWindowDimenstions";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import Loader from 'react-loader-spinner';
import {onLogout} from "../../redux/actions/generalActions";
import {Button} from "@material-ui/core";


const ProfileHeader = () => {
    const dispatch = useDispatch();
    const {height,width} = useWindowDimensions();
    const classes = useStyles({width,height})();
    const {inProgress,name,email,phone,products,userName} = useSelector((state:ApplicationState) => state.profileReducers)

    const logout = async () => {
        dispatch(onLogout());
    }

    return(
        <div className={classes.mainDiv}>
            {inProgress && products.length?
                <Loader type={'Rings'}/>
                :
                <>
                    <div className={classes.line}/>
                    <div className={classes.flexDiv}>
                        <div>
                            // @ts-ignore
                            <img className={classes.thumbnail} src={require('../../assets/temp.jpg')} alt={''}/>
                            {/*<img className={classes.thumbnail} src={} alt={''}/>*/}
                        </div>
                        <div className={classes.info}>
                            <h4>{userName}</h4>
                            <h4>{name}</h4>
                            <h5>{email}</h5>
                            <h5>{phone}</h5>
                            <div className={classes.postsInfo}>
                                <h6>{products.length} Posts</h6>
                                <div style={{paddingTop:15,paddingBottom:15}}>
                                    <Button variant="contained" onClick={logout} color="primary" >Exit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
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
    }
}));
export default ProfileHeader;
