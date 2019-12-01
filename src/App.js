import React,{useState} from 'react';
import Login from '../src/component/Login'
import './App.css';
import Search from '../src/component/Search'
import '../src/css/style.css'

import {
  HashRouter as Router,
  Route
} from "react-router-dom";
import RootContext from './component/Contexts'
const App = () => {
  const [userName,setUserName] = useState("")
  function setUser(user){
    console.log("userName",user)
    setUserName(user)
  }
  
  return (
    <div className="App">
      <Router>
        <RootContext.Provider value={{userName:userName} }>
        <Route exact component={()=><Login setUser = {setUser}/>} path='/' />
          <Route component={Search} path='/Search' />
          </RootContext.Provider>
      </Router>
    </div>
  );
}

export default App;
