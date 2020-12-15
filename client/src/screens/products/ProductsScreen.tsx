import React, {useEffect} from "react";
import CardItem from "../../components/product/CardItem";
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {onGetProductsMain} from "../../redux/actions/productsActions";


const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        dispatch(onGetProductsMain())
    },[])
    return(
        <div style={{marginTop:30}}>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card,index) => <CardItem key={index.toString()}/>)}
                    </Grid>
                </Container>
            </main>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));


export default ProductsScreen;
