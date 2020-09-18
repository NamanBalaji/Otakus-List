import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App';
import M from 'materialize-css';

const Navbar = ()=>{
    const searchModal = useRef(null);
    const {state,dispatch} = useContext(UserContext);
    const [anime, setAnime] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])

    const renderList = ()=>{
        if (state){
            return( <ul id="nav-mobile" className="right ">
                <li key="1"><i data-target="modal1" className="large material-icons modal-trigger">Search</i></li>
                <li key = "2"><Link to="/genreview">Genre</Link></li>
                <li key = "3"><Link to="/topupcoming">Upcoming Anime</Link></li>
                <li key = "4"><Link to="/watchlist">Watch List</Link></li>
                <li key = "5"><Link to="/watchlater">Watch Later</Link></li>
                <li key="6" > <button className="btn" style={{backgroundColor:"black", color:"white"}}
             onClick={()=>{
               localStorage.clear()
               dispatch({type:"CLEAR"})
               history.push('/login')
             }} >Logout</button>
          </li>
          </ul> 
            )
        }
        else{
            return (<ul id="nav-mobile" className="right ">
                <li key="1"><i data-target="modal1" className= "material-icons modal-trigger">Search</i></li>
                <li key = "2"><Link to="/genreview">Genre</Link></li>
                <li key = "3"><Link to="/topupcoming">Upcoming Anime</Link></li>
                <li key = "4" ><Link to="/login">Login</Link></li>
                <li key = "5"><Link to="/signup">SignUp</Link></li>
                </ul> 
            )
        }
        
    }

    const fetchAnime = (name)=>{
      let  newName = name.replace(/\s+/g, "");
      console.log(newName);
       let url = `https://api.jikan.moe/v3/search/anime?q=${newName}&page=1`
       const makeApiCall = async ()=>{
         let tempData = [];
         let res = await fetch(url);
            let result = await res.json();
            if (result.results) {
                tempData = result.results;
                console.log(tempData);
                setAnime(tempData);
              } 
       }
       makeApiCall();
    }
    return(
        <nav>
        <div className="nav-wrapper red darken-4">
          <Link to='/' className="brand-logo left">Otaku'sList</Link>
          {renderList()}
          </div>
          <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search anime"
            onChange={(e)=>fetchAnime(e.target.value)}
            />
             <ul className="collection">
               {anime.map(item=>{
                 return <div  onClick={()=>{
                  M.Modal.getInstance(searchModal.current).close()
                  let path = '/singleanime/'+item.mal_id;
                  history.push(path);
                   
                 }}><li className="collection-item">{item.title}</li></div> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setAnime('')}>close</button>
          </div>
        </div>
        
        </nav>
    )
 
}

export default Navbar;