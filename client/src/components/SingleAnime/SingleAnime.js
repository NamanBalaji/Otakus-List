import React, {useState,useContext,useEffect} from 'react';
import{UserContext} from '../../App';
import {useParams, Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { render } from 'react-dom';
import './singleanime.css';
import { animeGenreCodes } from '../../data/GenreData';
import { Button } from 'react-bootstrap';

const SingleAnime = ()=>{
    const history = useHistory();
    const {animeid} = useParams();
    const [data,setData] = useState("");
    const {state,dispatch} = useContext(UserContext)
    
    useEffect(()=>{
        const makeApiCall = async ()=>{
            const url = `https://api.jikan.moe/v3/anime/${animeid}`;
            const res = await fetch(url);
            const result = await res.json(); 
            //console.log(result);
            setData(result);
        } 
        makeApiCall();
    }, [])

    const addToWatchLater = async ()=>{
        await fetch("/watchlater",{
            method: "post",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              title: data.title,
              episodes: data.episodes
            })
        })
        history.push('/watchlater')
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
        history.push('/watchlist')
    }
       return(
        <div className="container">
              <h1 className='heading'>{data.title}</h1>
              

              {
                data.status!=="Finished Airing" ?
                   <div>
                   <div className="row">
                   <div className="col s6">
                   <img src={data.image_url}></img>
                   </div>
                     <div className="col s6">
                        <Button className=" red darken-4" onClick={()=>addToWatchLater()}>Watch Later</Button>
                     </div>

                </div>
                
                <h5>Yet to be aired</h5> 
                <h5>{data.premiered}</h5>
                <h5><a href={data.trailer_url}>Trailer</a></h5>
                <h5>Rating: {data.rating}</h5>
                <p className="synop">{data.synopsis}</p>
                    </div>
                : 
                <div>
                
                   <div className="row">
                   <div className="col s6">
                   <img src={data.image_url}></img>
                   </div>
                     <div className="col s6">
                     <div style={{marginBottom: "10px",marginTop:"20%"}}>
                     <Button className=" red darken-4" onClick={()=>{addToWatch(data.title, data.episodes, 0)}}>Start Watching</Button>
                     </div>
                     <div>
                     <Button className=" red darken-4" onClick={()=>addToWatchLater()}>Watch Later</Button>
                     </div>   
                     </div>
                     </div>
                <div className="row">
                <div className="col s6">
                <h5>Type: {data.type} ({data.score})</h5>
                <h5>Episodes: {data.episodes}</h5>
                 <h5>Finished Airing</h5> 
                 <h5>{data.source}</h5>
                 </div>
                <div className="col sm6">
                    <h5>{data.title_japanese}</h5>
                    <h5><a href={data.trailer_url}>Trailer</a></h5>
                    <h5>{data.type!=="Movie"?data.premiered:data.aired.string}</h5>
                    <h5>  Rated: {data.rating}</h5>

                </div>
                </div>
                 
                <p className = "synop"> 
                {data.synopsis}    
                </p>
                </div>
              }
              
        </div>  
        
      
    );
}

export default SingleAnime;