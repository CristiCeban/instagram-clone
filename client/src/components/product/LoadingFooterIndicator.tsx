import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Loader from "react-loader-spinner";
import {Color} from "../../config/Colors";

const LoadingFooterIndicator = () => {
    const classes = useStyles();

    return(
        <div className={classes.footer}>
            <Loader type={'Puff'} height={75} width={75} color={Color.secondaryColor}/>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    footer: {
        display:'flex',
        justifyContent:'center',
        margin:'0px auto'
    }
}));

export default LoadingFooterIndicator;
