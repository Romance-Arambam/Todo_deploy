import { Link } from "react-router-dom"
import  "./Navbar.css"
import { FaListAlt } from "react-icons/fa";
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

export default function Navbar(){

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(authActions.logout());
    }

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/"><FaListAlt /><b> todo maker</b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active " aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
        </li>
        {!isLoggedIn &&
        <li className="nav-item">
          <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign Up</Link>
        </li>}

        {isLoggedIn &&
        
        <li className="nav-item">
          <Link className="nav-link active btn-nav" aria-current="page" to="/" onClick={logout}>Log Out</Link>
        </li>}
        
        
        
        
        
      </ul>
    </div>
  </div>
</nav>
    )
}