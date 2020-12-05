import React from "react";
import HeaderPost from "./HeaderPost";
import {makeStyles} from "@material-ui/core/styles";
import useWindowDimensions from "../../hooks/useWindowDimenstions";


const Post = () => {
    const {height,width} = useWindowDimensions();
    const classes = useStyles({width,height})();
    return(
            <div className={classes.cart}>
                <HeaderPost/>
                <img className={classes.image}
                    src={'https://scontent.fkiv1-1.fna.fbcdn.net/v/t1.0-9/p843x403/129914749_216023799966301_6989284274598972353_o.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=sIijjmLErqQAX9O6beq&_nc_ht=scontent.fkiv1-1.fna&tp=6&oh=b5fd453a135f75d967c8f6f4312752f8&oe=5FF1229B'}
                />
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
        // display: 'flex',
        // justifyContent:'center',
        // alignItems:'center',
        marginTop:10,
        marginBottom:10,
        width:width/2,
        marginRight:width/4,
        marginLeft:width/4,
    },
    image: {
        flex: 1,
        // height: undefined,
        width : '100%'
    }
}));
export default Post;
