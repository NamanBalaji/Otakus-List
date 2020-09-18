import React,{useState,useEffect} from 'react';
import{Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup =  ()=>{
    const history  = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
   
  const uploadFields = ()=>{
    fetch("/signup",{
      method: "post",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error})
      }
      else{
        M.toast({html: data.message})
        history.push('/login')
      }
    }).catch(err=> {console.log(err);})
  }

  return(
    <div className="mycard">
    <div className="card auth-card" style={{color:"white"}}>
      <h2>Otaku'sList</h2>
      <input type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
      <input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}/>
      <button className="btn waves-effect waves-light grey darken-4" onClick={()=>uploadFields()}>Signup</button>
      <h6>
          <Link style={{color: "white "}} to='/login'>Already a user?</Link>
      </h6>
    </div>
</div>
  );
}
export default Signup;