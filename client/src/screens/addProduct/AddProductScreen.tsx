import React, {useRef} from "react";
import Container from "@material-ui/core/Container";
import {Formik} from "formik";
import * as yup from 'yup'
import {makeStyles} from "@material-ui/core/styles";
import {CssBaseline, MenuItem, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { DropzoneArea } from 'material-ui-dropzone';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../redux/reducers";
import { Bounce } from 'react-activity';
import {onUploadProduct} from "../../redux/actions/productsActions";




const initFormValue = {
    name: '',
    price : '',
    short_description: '',
    long_description: '',
    category_id : '',
    files : []
}

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const validationSchema = yup.object().shape({
    name: yup.string()
        .label('name')
        .required('Please enter name of product')
        .min(3,'Name must be at least 3 characters'),
    price : yup.string()
        .label('price')
        .required('Please enter the product price')
        .min(1,'Products price must be at least 1'),
    short_description : yup.string()
        .label('short_description')
        .required('Please enter an short description of the product')
        .min(1,'Product short description must be at least 10 characters')
        .max(100,'Product short description must be at most 100 characters'),
    long_description : yup.string()
        .label('long_description')
        .required('Please enter an long description of the product')
        .min(5,'Product long description must be at least 50 characters')
        .max(1000,'Product long description must be at most 1000 characters'),
    category_id : yup.string()
        .label('category_id')
        .required('Please select a category'),
    files : yup.array()
        .label('files')
        .required('Please upload an image')
        .min(1,'Please upload at least 1 image')
        .max(10,'Please upload at most 10 images')
})

const AddProductScreen = () => {
    const dispatch = useDispatch();
    const formikRef = useRef(null);
    const classes = useStyles();
    const {inProgress} = useSelector((state: ApplicationState) => state.productsReducers);

    const onAddProduct = (values : any) => {
        dispatch(onUploadProduct(values))
    }
    return (
        <Container component="main" maxWidth="xs" style={{marginTop:100}}>
            <Formik
                innerRef={formikRef}
                validationSchema={validationSchema}
                initialValues={initFormValue}
                onSubmit={(values) => onAddProduct(values)}
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
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Typography component='h1' variant='h5'>
                                Add product
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="product's name"
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
                                    name="short_description"
                                    label="short description"
                                    type="short_description"
                                    id="short_description"
                                    multiline
                                    value={values.short_description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.short_description&&touched.short_description) && errors.short_description}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="long_description"
                                    label="long description"
                                    type="long_description"
                                    id="long_description"
                                    multiline
                                    value={values.long_description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.long_description&&touched.long_description) && errors.long_description}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="price"
                                    label="price"
                                    type="number"
                                    id="price"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.price&&touched.price) && errors.price}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="category_id"
                                    label="category"
                                    select
                                    id="category_id"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={values.category_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.category_id&&touched.category_id) && errors.category_id}
                                    FormHelperTextProps={{
                                        className : classes.helperText
                                    }}
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    filesLimit={10}
                                    dropzoneText={"Drag and drop an image here or click"}
                                    onChange={(images) => formikRef?.current?.setFieldValue('files',images)}
                                />
                                {(errors.files&&touched.files) && errors.files ?
                                <p className={classes.helperText} style={{paddingLeft:15,fontSize:12,marginBottom:-15}}>
                                    {(errors.files&&touched.files) && errors.files}
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
                                            <Bounce style={{marginTop:25}}/>
                                            :
                                            'Add Product'
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

export default AddProductScreen;
