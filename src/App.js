import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { Payment } from '@mui/icons-material';
import {loadStripe} from "@stripe/react-stripe-js";
import {Elements} from "@stripe/react-stripe-js"

const promise=loadStripe('pk_test_51MGHjDSAVOIzWBrea2OEvRp7LVTGDZONTOQnr0bzkeoitulIRiJxbdHCsY03J7AzaEyVyk2T4HxDJA453kOOljND00R4UCNhfD');

function App() {

  const [{},dispatch]=useStateValue

  useEffect(()=>{
    //will only run once when the component loads
    auth.onAuthStateChanged(authUser=>{
      console.log('THE USER IS >>>',authUser);
      if(authUser){
        //user just logged in / the user was logged in
        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }else{
        // the user is logged out
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    })
  },[])
  return (
    //BEM convention

    <Router>
       <div className="app">
       <Header/>
      <Routes>
        <Route exact path="/checkout" element={<Checkout/>}>
         
        </Route>
        <Route exact path="/" element={<Home />} >
      
      
     
        </Route>
        <Route exact path="/login" element={<Login />} ></Route>
        <Route exact path="/payment" element={<Payment />} >
          <Elements stripe={promise}></Elements>
        </Route>

      </Routes>
    
  
    </div>
    </Router>
   
  );
}

export default App;
