import React, {useRef, useState} from 'react';
import {render} from 'react-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// @ts-ignore
import { Bounce } from 'react-activity';
import 'react-activity/dist/react-activity.css';
import * as yup from 'yup'
import {Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {onLogin} from "../../redux/actions/authActions";
import {ApplicationState} from "../../redux/reducers";

const initFormValue = {
    email: '',
    password: '',
}
const validationSchema = yup.object().shape({
    email: yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter an email'),
    password: yup.string()
        .label('Password')
        .required()
        .min(4, 'Password must have at least 4 characters '),
});


const AuthScreen = () =>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const {inProgress} = useSelector((state: ApplicationState) => state.authReducer);
    const formikRef = useRef(null);


    const onSignIn= () => {
        dispatch(onLogin({email : 'a',password : 'a'}))
    }

    return (
        <Container component="main" maxWidth="xs">
            <Formik
                innerRef={formikRef}
                validationSchema={validationSchema}
                initialValues={initFormValue}
                onSubmit={() => console.log('submit')}
            >
                {({errors,
                  status,
                  touched}
                ) => (
                    <>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type='button'
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={onSignIn}
                                >
                                     <div style={{minHeight:25}}>
                                         {inProgress ?
                                            <Bounce style={{marginTop:25}}/>
                                         :
                                         'Sign in'
                                         }
                                     </div>

                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signUp" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={8}/>
                    </>
                )}
            </Formik>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default AuthScreen
