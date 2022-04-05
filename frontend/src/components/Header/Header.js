import './Header.css';
import logo from '../../../src/pslogo.png';
import {Link} from 'react-router-dom';

//Header on all pages, contains a navbar with links

function Header ({token, handleLogin}) {

    //If you log out, the locally stored data is cleared
    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        //Pass an empty string to handleLogin
        handleLogin("");

    }

    return(
    <div className="Header">

        <nav className="navbar">

        <div className="logo">PlayStation</div>
        <img className="logoimage" src={logo} alt="logo"></img>

        <ul className="nav-links">

        {/* Similar logic to the App.js Routes but for display */}
        {!token &&
         <>
        <div className="menu">
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Log in</Link></li>
        </div>
        </>
        }  

        {/* Similar logic to the App.js Routes  but for display */}
        {token &&
         <>
        <div className="menu">
        <li><Link to="/library">My Library</Link></li>
        <li><Link to="/games">Games List</Link></li>
        <li><button onClick={logout}>Logout</button></li>
        </div>
        </>
        }  
        </ul>
        </nav>


    </div>

    )

}

export default Header;