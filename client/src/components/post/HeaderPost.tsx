import React from 'react'
import {Box, IconButton, Link} from "@material-ui/core";
import {AccountCircle, MoreHoriz} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const HeaderPost = () => {
    const classes = useStyles();
    return (
        <div className={classes.mainDiv}>
            <div className={classes.detailDiv}>
                <IconButton>
                    <AccountCircle/>
                </IconButton>
                <p>Name</p>
            </div>
            <IconButton>
                <MoreHoriz/>
            </IconButton>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    header: {
        flex:1,
        flexDirection:'row'
    },
    mainDiv: {
        display : 'flex',
        flexDirection: 'row',
        justifyContent : 'space-between'
    },
    detailDiv: {
        display : 'flex',
        flexDirection: 'row',
    }
}));
export default HeaderPost;
