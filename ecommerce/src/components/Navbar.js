import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/Logo.png";
import { Badge, Button } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { actionTypes } from "../reducer";
import { useGlobalState } from "../StateProvider";

const useStyles = makeStyles((theme) =>({
    root: {
      flexGrow: 1,
      marginBottom: "7rem",
    },
    appBar: {
      backgroundColor: "whitesmoke",
      boxShadow: "none",
    },
    grow: {
      flexGrow: 1,
    },
    button: {
      marginLeft: theme.spacing(2),
    },
    image: {
      marginRight: "10px",
    },
  }));

const Navbar = () => {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useGlobalState();
  const navigate = useNavigate();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      });
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
      navigate.push("/");
    } 
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Link to="/">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} className={classes.image} alt='Logo'/>
          </IconButton>
        </Link>
          
          <div className={classes.grow} />
          <Typography variant="h6" color="textPrimary" component="p">
            Hola {user ? user.email : "Cliente"}
          </Typography>
          <div className={classes.button}>
          <Link to={!user && "/signin"}>
          <Button onClick={handleAuth} variant='outlined'>
            <strong>{user ? "Sign Out" : "Sign In"}</strong>
          </Button>
          </Link>
          
          <Link to='/checkout-page'>
          <IconButton aria-label='show cart items' color='inherit'>
             <Badge badgeContent={basket?.length} color='secondary'>
                 <ShoppingCart fontSize='large' color='primary'/>
             </Badge>
          </IconButton> 
          </Link>
          
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;