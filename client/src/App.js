import React, {useEffect, createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';

import './App.css';
import {reducer, initialState} from './reducers/userReducer';
import Signup from './components/Signup/Signup';
import Login from  './components/Login/Login';
import TopAnime from './components/TopAnime/TopAnime'
import GenreView from './components/GenreView/GenreView';
import TopUpcoming from './components/TopUpcoming/TopUpcoming';
import SingleAnime from './components/SingleAnime/SingleAnime';
import Navbar from './components/NavBar';
import WatchLater from './components/WatchLater/WatchLater';
import WatchList from './components/WatchList/WatchList';

export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
      if(user){
         dispatch({type:"USER",payload:user})
      }
      else{
         history.push('/')
     }
  },[])

  return(
    <Switch>
     <Route exact path="/">
      <TopAnime />
   </Route>
   <Route path="/singleanime/:animeid">
      <SingleAnime />
   </Route>
   <Route path="/topupcoming">
      <TopUpcoming />
   </Route>
       <Route path="/signup">
      <Signup />
   </Route>
   <Route path="/login">
      <Login />
   </Route>
   <Route path="/genreview">
      <GenreView />
   </Route>
   <Route exact path="/watchlater">
      <WatchLater />
   </Route>
   <Route exact path="/watchlist">
      <WatchList />
   </Route>

    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
 return (
    <UserContext.Provider value={{state,dispatch}}>
   <BrowserRouter>
   <Navbar />
     <Routing />
     
   </BrowserRouter>
   </UserContext.Provider>
  
 );
}

export default App;
