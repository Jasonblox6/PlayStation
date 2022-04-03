import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router';
import Library from './routes/Library/Library';
import Login from './routes/Login/Login';
import Header from './components/Header/Header';
import {useEffect, useState} from 'react';

function App() {

  const [jwt, setJWT] = useState(localStorage.getItem('token'));

  const login = (token) =>{
    setJWT(token);
  }


  return (
    <div className="App">

      <Header token={jwt} handleLogin={login}></Header>

      <Routes>
        {!jwt &&
        <>
        <Route path="/signup"></Route>
        <Route path="/" element={<Login handleLogin={login}/>}></Route>
        </>
        }
        {jwt &&
        <>
        <Route path="/" element={<Library/>}></Route>       
        <Route path="/library" element={<Library token={jwt}/>}></Route>
        <Route path="/library/:id"></Route>
        <Route path="/games"></Route>
        <Route path="/games/:id"></Route>
        </>
        }
        <Route path="*" element={jwt? <Library token={jwt}/> : <Login handleLogin={login}/>}></Route>

      </Routes> 
    </div>
  );
}

export default App;
