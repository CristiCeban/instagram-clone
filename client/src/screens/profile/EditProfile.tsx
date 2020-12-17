import React, {useRef} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {CssBaseline, Typography} from "@material-ui/core";
import {Formik} from "formik";
import * as yup from 'yup'
import {ApplicationState} from "../../redux/reducers";
import TextField from "@material-ui/core/TextField";
import {DropzoneArea} from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
//@ts-ignore
import { Bounce } from 'react-activity';
import {onUpdateProfile} from "../../redux/actions/profileActions";
import {useHistory} from "react-router";

const validationSchema = yup.object().shape({
    name: yup.string()
        .label('name')
        .required('Please enter name of product')
        .min(3, 'Name must be at least 3 characters')
        .max(20,'Name must be at most 20 characters'),
    phone: yup.string()
        .label('phone')
        .required('Please enter your phone')
        .min(7,'Phone number must be at least 7 digits')
        .max(20,'Phone number must be at most 20 digits'),
    userName: yup.string()
        .label('userName')
        .required('Please enter you userName')
        .min(3,'UserName must be at least 3 characters')
        .max(20,'UserName must be at most 20 characters'),
    imagePath : yup.array()
        .label('imagePath')
        .max(1,'No more than 1 image'),
})

const EditProfile = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigation = useHistory();
    const formikRef = useRef(null)

    const {name,phone,imagePath,userName,inProgress} = useSelector((state:ApplicationState) => state.profileReducers)
    const initFormValue = {
        name,
        phone,
        imagePath,
        userName
    }

    const onUpdateInfo = async (values : any) => {
        await dispatch(onUpdateProfile(values));
        navigation.replace('/profile')
    }

    return (
        <Container component="main" maxWidth="xs" style={{marginTop:100}}>
            <Formik
                innerRef={formikRef}
                initialValues={initFormValue}
                validationSchema={validationSchema}
                onSubmit={(values) => onUpdateInfo(values)}
                >
                {({
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <>
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Typography component='h1' variant='h5'>
                                Edit Profile
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Your Name"
                                    name="name"
                                    autoFocus
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.name && touched.name) && errors.name}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="phone"
                                    type="number"
                                    label="Your phone number"
                                    name="phone"
                                    autoFocus
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.phone && touched.phone) && errors.phone}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="userName"
                                    label="Your Username"
                                    name="userName"
                                    autoFocus
                                    value={values.userName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.userName && touched.userName) && errors.userName}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    filesLimit={1}
                                    dropzoneText={"Drag and drop your new thumbnail here or click"}
                                    onChange={(image) => formikRef?.current?.setFieldValue('imagePath',image)}
                                />
                                {(errors.imagePath&&touched.imagePath) && errors.imagePath ?
                                    <p className={classes.helperText} style={{paddingLeft:15,fontSize:12,marginBottom:-15}}>
                                        {(errors.imagePath&&touched.imagePath) && errors.imagePath}
                                    </p>
                                    : null}
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    <div style={{minHeight:25}}>
                                        {inProgress ?
                                            <div style={{paddingTop:10}}>
                                                <Bounce />
                                            </div>
                                            :
                                            'Edit Profile'
                                        }
                                    </div>
                                </Button>
                            </form>
                        </div>
                    </>
                )}

            </Formik>
        </Container>
    )
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
    },
}));

export default EditProfile;
