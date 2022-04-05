import './App.css';
import {Route, Routes} from 'react-router';
import Library from './routes/Library/Library';
import Games from './routes/Games/Games';
import Game from './routes/Game/Game';
import Signup from './routes/Signup/Signup';
import Login from './routes/Login/Login';
import Header from './components/Header/Header';
import {useState} from 'react';

function App() {

  //Check local storage for a jwt token - if the user has logged in this will be there
  const [jwt, setJWT] = useState(localStorage.getItem('token'));

  //When login is called, set the token. This is how the delay in storage of the token is handled when logging in initially
  const login = (token) =>{
    setJWT(token);
  }

  return (
    <div className="App">
      {/* Header on all pages with the navbar */}
      <Header token={jwt} handleLogin={login}></Header>

      {/* Use Routes for the return of the "pages", each linked with an element and some params or calls */}
      <Routes>
        {/* If we don't have a jwt, we only allow access to log in and signup, as the user isn't logged in */}
        {!jwt &&
        <>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/" element={<Login handleLogin={login}/>}></Route>
        </>
        }
        {/* If we do have a jwt, we allow access to other pages */}
        {jwt &&
        <>
        <Route path="/" element={<Library/>}></Route>       
        <Route path="/library" element={<Library token={jwt}/>}></Route>
        <Route path="/library/:id" element={<Game/>}></Route>
        <Route path="/games" element={<Games token={jwt}/>}></Route>
        <Route path="/games/:id" element={<Game/>}></Route>
        </>
        }
        {/* If you attempt to navigate to a non-routed path, the Route navigates to either the library if you're logged in, or the login page otherwise */}
        <Route path="*" element={jwt? <Library token={jwt}/> : <Login handleLogin={login}/>}></Route>

      </Routes> 
    </div>
  );
}

export default App;
