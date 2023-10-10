import './App.css';
import CheckoutPage from './components/CheckoutPage';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Entrar from './components/Entrar';
import Registrate from './components/Registrate';
import Products from './components/Products';
import { useEffect } from 'react';
import { auth } from "./firebase";
import { useGlobalState } from "./StateProvider";
import { actionTypes } from './reducer';
import Checkout from './components/CheckoutForm/Checkout';

function App() {
  const [{ user }, dispatch] = useGlobalState();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    <Router>
    <div className='app'>
      <Navbar user={user} />
      <Routes>
         <Route path='/signup' element={<Registrate />}></Route> 
        <Route path='/signin' element={<Entrar />}></Route>  
        <Route path='/checkout-page' element={<CheckoutPage />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route> 
        <Route path='/' element={<Products />}></Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;