import React, {useState,useContext,useEffect} from 'react';
import{UserContext} from '../../App';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { render } from 'react-dom';
import {animeGenreCodes} from '../../data/GenreData';

import './genreview.css';

const GenreView = ()=>{
    const history = useHistory();
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(()=>{
        const makeApiCall = async ()=>{
            
            let tempData = [];
            for (let i = 1; i < 6; i++) {
            let url = `https://api.jikan.moe/v3/search/anime?genre=${1 +
            animeGenreCodes.indexOf(
              selected
            )}&page=${i}&order_by=score`; 
            let res = await fetch(url);
            let result = await res.json();
            if (result.results) {
                tempData = tempData.concat(result.results);
                console.log(tempData);
                setData(tempData);
              } 
         }
         
         
        }
        makeApiCall();
        //console.log(data);
    },[selected])
     
    return(

    <div className="container">
        <div>
            <h1 className="heading">Genre Specific Anime</h1>
        </div>
        <div className="row">      
            {animeGenreCodes.map((code)=>{
                return (
                    <div key={animeGenreCodes.indexOf(code)} className="col s2">
                    <button className="button btn" style={ {marginLeft:"1%", marginBottom:"2%", padding:"0px",width:"150px"}} onClick = {(e)=>{
                setSelected(code);
       //console.log(selected)
             }}>{code}</button>
                    </div>
                )
               
            })}
        </div>
     
        <div className="row">
              {
                data.map(item=>{
                    return(
                        <div key={item.rank} className="col s12 m6 l4 fixer" onClick={()=>{let path = '/singleanime/'+item.mal_id;
                        history.push(path);}}>
                              <div className="card box">
                                  <div className="card-image">
                                      <img style={{height:"550px",marin:"0"}} src={item.image_url}></img>
                                  </div>
                                  <div className="card-content" style={{height:"40px", padding:"0", justifyContent:"center"}}>
                                      <h6> <b>{item.title}</b> {item.score}</h6>
                                   </div>
                              </div>
                          </div>
                      );
                })
            }
           </div>
    </div>
    );
}

export default GenreView;