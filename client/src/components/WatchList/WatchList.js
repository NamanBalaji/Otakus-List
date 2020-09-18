import React, {useState,useContext,useEffect} from 'react';
import{UserContext} from '../../App';
import {useParams, Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';

const WatchList = ()=>{
     const [data, setData] = useState([]);
     const [current, setCurrent] = useState("");
     const history = useHistory();
     const  {state,dispatch} = useContext(UserContext);
     let i = 0;

     useEffect(()=>{
      if(localStorage.getItem("jwt")===null){
        history.push('/login')
      }else{
        fetch('/watchlist',{
            method: "get",
            headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
          }).then(user=>user.json())
          .then(result=>{
            let list = result.user.watchList
    
            setData(list);

            //console.log(data);
          })}
    },[data])
     
    const submit = (tit, ep, cur)=>{
        

        
        fetch("/watchlist/save",{
            method: "post",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              title: tit,
              episodes: ep,
              watched: cur
            })
        })
      
        history.push('/watchlist')
    }

    const removeAnime = (tit, epi, wat)=>{
      fetch("/watchlist/del",{
        method: "post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title: tit,
          episodes: epi,
          watched: wat
        })
    }) 
    }
    return(
        <div className="container" style={{marginTop: "5%"}}>
           {
               data.map((item)=>{
                 return <div key={i++}className="row">
                 <div className="col s8">
           <h5>{item.title}</h5>
           <h6>
              Last Watched: Episode {item.watched} 
           </h6>  
        </div>
        <div className="col s4">
        <input style={{color: "white"}}className= 'counterInput' type="number" placeholder = {item.watched} type = 'number' min="0" max={item.episodes} onChange={(e)=>{
          setCurrent(e.target.value);
          console.log(current)}}/>
        <Button style={{marginTop:"10px", marginRight:"2%"}} className="red darken-4"  onClick={()=>{submit(item.title, item.episodes, current)}}>Save</Button>
        <Button style={{marginTop:"10px"}} className="red darken-4" onClick={()=>{removeAnime(item.title, item.episodes, item.watched)}}>Remove</Button>
        </div>
        <hr></hr>
                 </div>
               })
           }
        </div>
    )
        }


export default WatchList;

