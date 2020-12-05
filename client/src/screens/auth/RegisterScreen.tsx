import React, {useRef} from "react";
import * as yup from "yup";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import Container from "@material-ui/core/Container";
import {Formik} from "formik";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
// @ts-ignore
import { Bounce } from 'react-activity';
import {onLogin} from "../../redux/actions/authActions";



const initFormValue = {
    email: '',
    name : '',
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
    name : yup.string()
        .label('name')
        .required()
        .min(4,'Name must have at least 4 characters'),
});

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {inProgress} = useSelector((state: ApplicationState) => state.authReducer);
    const formikRef = useRef(null);

    const onSignIn= () => {
        console.log('sign in');
        dispatch(onLogin({email : 'a',password : 'a'}))
    }
    return (
        <Container component="main" maxWidth="xs">
            <Formik
                innerRef={formikRef}
                validationSchema={validationSchema}
                initialValues={initFormValue}
                onSubmit={onSignIn}
            >
                {({
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      handleBlur,
                      setFieldValue,
                      values
                  }) => (
                    <>
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <form className={classes.form} onSubmit={onSignIn}>
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
                                    name="name"
                                    label="name"
                                    type="name"
                                    id="name"
                                    autoComplete="name"
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
                                    onClick={() => handleSubmit()}
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
                                        <Link href="/signIn" variant="body2">
                                            {"Already have an account? Sign In"}
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


export default RegisterScreen
