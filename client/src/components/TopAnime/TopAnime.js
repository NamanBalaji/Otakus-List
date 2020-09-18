import React, {useState,useContext,useEffect} from 'react';
import{UserContext} from '../../App';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { render } from 'react-dom';
import SingleAnime from '../SingleAnime/SingleAnime';
import './topanime.css';
const TopAnime = ()=>{
    const history = useHistory();
    const [data, setData] = useState([]);
    useEffect(()=>{
        const makeApiCall = async ()=>{
            let tempData = [];
            for (let i= 1; i<9; i++){         
            const url = `https://api.jikan.moe/v3/top/anime/${i}`;
            let res = await fetch(url);
            let result = await res.json()
            //console.log(result.top[0]);
            if (result.top) {
                tempData = tempData.concat(result.top);
                setData(tempData);
              }
            }
             }
        makeApiCall();
        console.log(data);
    },[])

    return(
      <div className="container">
          <h1 className="heading">
              Top Anime
          </h1>
          <div className="row">
                {
                  data.map(item=>{
                      return(
                          <div key= {item.rank} className="col s12 m6 l4 fixer" onClick={()=>{let path = '/singleanime/'+item.mal_id;
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

export default TopAnime;