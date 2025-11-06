import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import Signup from "./components/signup/signup";
import Signin from "./components/signin/signin";
import Todo from "./components/todo/todo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
 
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import './App.css'

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      const id = sessionStorage.getItem("Id");
      if(id){
        dispatch(authActions.login());
      }
  },[])
  return(
    <div>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/todo" element={<Todo/>}/>
          <Route path ="/signup" element={<Signup/>}/>
          <Route path = "/signin" element={<Signin/>}/>

        </Routes>
      </Router>
      
      
      <Footer/>
    </div>    
  )
}