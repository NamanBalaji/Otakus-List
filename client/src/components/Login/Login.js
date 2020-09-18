import React, {useState,useContext,} from 'react';
import{UserContext} from '../../App';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import './login.css';

const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
  const history = useHistory();
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const postData =()=>{
    fetch("/login",{
      method: "post",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.error){
        M.toast({html: data.error})
      }
      else{
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html: "Logged in successfully"})
        history.push('/')
      }
    }).catch(err=> {console.log(err);})
  }

  return(
    <div className="mycard container">
    <div className="card auth-card"  style={{color:"white"}}>
      <h2>Otaku'sList</h2>
      <input type='email' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}} />
      <input type='password' placeholder='password'  onChange={(e)=>{setPassword(e.target.value)}} />
      <button className="btn waves-effect waves-light grey darken-4" onClick={()=>postData()} >Login</button>
      <h6>
      <Link style={{color: "white "}} to='/signup'>Don't have an account?</Link>
  </h6>
    </div>
</div>
  );
}

export default Login;