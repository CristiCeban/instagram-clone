import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useWindowDimensions from "../../hooks/useWindowDimenstions";
import {Button} from "@material-ui/core";

const ProfileForeignHeader = ({userName,name,email,phone,productsLength} : any) => {
    const {height,width} = useWindowDimensions();
    const classes = useStyles({width,height})();

    return (
        <div className={classes.mainDiv}>
            <div className={classes.line}/>
            <div className={classes.flexDiv}>
                <div>
                    {/* @ts-ignore*/}
                    <img className={classes.thumbnail} src={require('../../assets/temp.jpg')} alt={''}/>
                </div>
                <div className={classes.info}>
                    <h4>{userName}</h4>
                    <h4>{name}</h4>
                    <h5>{email}</h5>
                    <h5>{phone}</h5>
                    <div className={classes.postsInfo}>
                        <h6>{productsLength} Posts</h6>
                    </div>
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
    }
}));
export default ProfileForeignHeader;
