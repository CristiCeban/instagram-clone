import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import {Favorite} from "@material-ui/icons";

const PostFooter = () => {
    const classes = useStyles();
    return(
        <div className={classes.mainDiv}>
            <p>Footer</p>
            <IconButton>
                <Favorite/>
            </IconButton>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        display : 'flex',
        flexDirection: 'row',
        justifyContent : 'space-between'
    },
}));
export default PostFooter;
