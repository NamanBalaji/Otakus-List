import React, {useState,useContext,useEffect} from 'react';
import{UserContext} from '../../App';
import {useParams, Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';

const WatchLater= ()=>{
    const history = useHistory();
  const [data, setData] = useState([]);
  const  {state,dispatch} = useContext(UserContext);
  let i=0;
  useEffect(()=>{
    if(localStorage.getItem("jwt")===null){
      history.push('/login')
    }else{
    fetch('/watchlater',{
        method: "get",
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      }).then(user=>user.json())
      .then(result=>{
        let list = result.user.watchLater

        setData(list);
        //console.log(data.length);
      })
    }
  },[data])
    
  const removeFromList = (tit, epi)=>{
    fetch("/watchlater",{
        method: "put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title: tit,
          episodes: epi
        })
    }).then(user=>user.json())
    .then(result=>{
        console.log(result);
      let list = result.watchLater

      setData(list);
  } )
    } 
  
    const addToWatch = (tit, epi, wat)=>{
        fetch("/watchlist/add",{
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
        removeFromList(tit, epi);
       history.push('/watchlist')
    }

  return(
      <div className="container" style={{marginTop: "5%"}}>

         {
    data.map((item)=>{
        return <div key={i++}className="row"><div className="col s8">
           <h5>{item.title}</h5> 
        </div>
        <div className="col s4">
        {item.episodes===null?<span></span>:<Button style={{marginTop:"10px"}}className="red darken-4" onClick={()=>{addToWatch(item.title, item.episodes, 0)}}>Watch</Button>}
        <Button style={{marginTop:"10px", marginLeft:"2%"}}className="red darken-4" onClick={()=>{removeFromList(item.title, item.episodes)}}>Remove</Button>
 </div>
 <hr></hr>
 </div>
        
    })


}

             

      </div>
  )

}

export default WatchLater;

