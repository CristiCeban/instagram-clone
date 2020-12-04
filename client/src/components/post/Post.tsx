import React from "react";
import HeaderPost from "./HeaderPost";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import useWindowDimensions from "../../hooks/useWindowDimenstions";


const Post = () => {
    const {height,width} = useWindowDimensions();
    const classes = useStyles({width,height})();
    return(
            <div className={classes.cart}>
                <HeaderPost/>
            </div>
    )
}
const useStyles = ({width=0,height=0} : any) => makeStyles(() => ({
    header: {
        flex:1,
        flexDirection:'row'
    },
    cart: {
        backgroundColor:'white',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginRight:width/4,
        marginLeft:width/4,
    }
}));
export default Post;
