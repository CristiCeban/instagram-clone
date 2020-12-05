import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AccountCircle, Favorite, Home, Search} from "@material-ui/icons";
import {AppBar, IconButton, InputBase, Link, Toolbar, Typography} from "@material-ui/core";
import { useLocation } from 'react-router-dom'

enum routerEnum {
    main = '/',
    profile = '/profile',
    favorites = '/favorites'
}


const NavBar = () =>{
    const classes = useStyles();
    const location = useLocation();
    const {pathname} = location;

    return (
        <div className={classes.root}>
            <AppBar position="fixed" style={{backgroundColor:'#bbbfbc'}}>
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

                    <Link href={'/'}>
                        <IconButton>
                                <Home className={pathname === routerEnum.main
                                    ? classes.selectedNavIcon
                                    :
                                    undefined}
                                />
                        </IconButton>
                    </Link>

                    <Link href={'/favorites'}>
                        <IconButton>
                                <Favorite className={pathname === routerEnum.favorites
                                    ? classes.selectedNavIcon
                                    :
                                    undefined }
                                />
                        </IconButton>
                    </Link>

                    <Link href={'/profile'}>
                        <IconButton>
                                <AccountCircle className={pathname === routerEnum.profile
                                    ? classes.selectedNavIcon
                                    :
                                    undefined}
                                />
                        </IconButton>
                    </Link>

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
    selectedNavIcon : {
        color:'#a50101'
    }
}));

export default NavBar;
