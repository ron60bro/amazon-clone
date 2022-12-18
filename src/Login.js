import React ,{useState}from 'react'
import "./Login.css"
import { Link ,useNavigate} from 'react-router-dom'
import { auth } from './firebase';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    } from "firebase/auth";
    // import { getFirestore, addDoc, collection } from "firebase/firestore";
    // const db = getFirestore();
    // const auth = getAuth();
function Login() {
    const navigate=useNavigate();
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")

    const signIn=(e)=>{
            e.preventDefault();
            auth.signInWithEmailAndPassword(email,password)
            .then(auth=>{
                navigate("/")
            })
            .catch(error=>alert(error.message))
            //some fancy firebase login

    }
    const register=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            //it successfully create new user with email and password
            if(auth){
                navigate("/")
            }
        })
        .catch(error=> alert(error.message))
        //do some fancy firebase register shittt....
    }
  return (
    <div className='login'>
        <Link to="/">
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' className='login__logo'/>
        </Link>
        <div className="login__container">
            <h1>Sign in</h1>

            <form>
                <h5>E-mail</h5>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className='login__signInButton' type='submit' onClick={signIn}>Sign In</button>
            </form>
            <p>
                By signing-in you agree to Amazon Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
            </p>
            <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
        </div>
    </div>
  )
}

export default Login