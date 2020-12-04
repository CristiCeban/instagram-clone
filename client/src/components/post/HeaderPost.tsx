import React from 'react'
import {Box, IconButton} from "@material-ui/core";
import {AccountCircle, MoreHoriz} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const HeaderPost = () => {
    const classes = useStyles();
    return (
            <Box display='flex' flexDirection={'center'} >
                {/*<Box flexDirection='center'>*/}
                    <IconButton>
                        <AccountCircle/>
                    </IconButton>
                    <p>Name</p>
                {/*</Box>*/}
                <Box flexDirection={'row-reverse'}>
                    <IconButton>
                        <MoreHoriz/>
                    </IconButton>
                </Box>
            </Box>
    )
}


const useStyles = makeStyles((theme) => ({
    header: {
        flex:1,
        flexDirection:'row'
    },
}));
export default HeaderPost;
