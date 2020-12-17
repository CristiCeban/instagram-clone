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
import {onRegister} from "../../redux/actions/authActions";



const initFormValue = {
    email: '',
    username : '',
    password: '',
    name: '',
    phone: '',
}
const validationSchema = yup.object().shape({
    email: yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter an email'),
    password: yup.string()
        .label('Password')
        .required('Please enter your password')
        .min(4, 'Password must have at least 4 characters '),
    username : yup.string()
        .label('username')
        .required('Please enter an username')
        .min(4,'Name must have at least 4 characters'),
    name: yup.string()
        .label('name')
        .required()
        .min(4),
    phone: yup.string()
        .label('phone')
        .required('Please enter your phone number')
        .min(7)
        .max(20)
});

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {inProgress,errorRegister} = useSelector((state: ApplicationState) => state.authReducer);
    const formikRef = useRef(null);

    const onSignUp= (values : any) => {
        dispatch(onRegister(values))
    }
    return (
        <Container component="main" maxWidth="xs">
            <Formik
                innerRef={formikRef}
                validationSchema={validationSchema}
                initialValues={initFormValue}
                onSubmit={(values) => onSignUp(values)}
            >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit
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
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.email && touched.email) && errors.email}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="username"
                                    label="username"
                                    type="username"
                                    id="username"
                                    autoComplete="name"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.username&&touched.username) && errors.username}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.password&&touched.password) && errors.password}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="name"
                                    label="name"
                                    type="name"
                                    id="name"
                                    autoComplete="current-name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name&&touched.name) && errors.name}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="phone"
                                    label="phone"
                                    type="number"
                                    id="phone"
                                    autoComplete="current-phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.phone&&touched.phone) && errors.phone}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    <div style={{minHeight:25}}>
                                        {inProgress ?
                                            <Bounce style={{marginTop:25}}/>
                                            :
                                            'Sign Up'
                                        }
                                    </div>

                                </Button>
                                {errorRegister ?
                                    <p className={classes.helperText} style={{paddingLeft:15,fontSize:12,marginTop:-5}}>{errorRegister}</p>
                                    :null}
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
    helperText : {
        color : '#a20606'
    }
}));


export default RegisterScreen
