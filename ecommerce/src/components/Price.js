import { Button, makeStyles } from "@material-ui/core";
import accounting from "accounting";
import reducer, { getBasketPrice, initialState } from "../reducer";
import { useReducer } from "react";
//import { Link } from "react-router-dom";

const useStyles = makeStyles((theme)=> (
    {
        root: {
            display:"flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems: "center",
            height:"20vh"
          },
          button: {
            maxWidth: "200px",
            marginTop: "2rem",
          },
    }))

const Price = () => {
    const classes = useStyles();
    const [{ basket }, dispatch] = useReducer(reducer, initialState);
  return (
    <div className={classes.root}>
        <h5>Precio total: {basket?.length}</h5>
        <h5>{accounting.formatMoney(getBasketPrice(basket), "€")}</h5>
        <Button className={classes.button} variant="contained" color="secondary">Comprar</Button>
    </div>
  )
}

export default Price;