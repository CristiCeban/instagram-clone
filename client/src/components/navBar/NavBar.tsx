import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AccountCircle, Favorite, Home, Search} from "@material-ui/icons";
import {AppBar, IconButton, InputBase, Toolbar, Typography} from "@material-ui/core";

const NavBar = () =>{
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor:'#bbbfbc'}}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Instagram Clone
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <IconButton onClick={() => console.log('home')}>
                        <Home/>
                    </IconButton>
                    <IconButton>
                        <Favorite/>
                    </IconButton>
                    <IconButton>
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color : 'black'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        // marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        color : 'black'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default NavBar;
