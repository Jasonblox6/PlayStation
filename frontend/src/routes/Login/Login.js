import {useState} from 'react';
import {useNavigate} from 'react-router';
import Auth from '../../services/auth';
import './Login.css';

function Login ({handleLogin}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async(e) => {
        e.preventDefault();
        const token = await Auth.login(username, password);
        handleLogin(token);
    }


    return(
    <>
        <div className="Container"> 
        <form onSubmit={submit}>

            <div className="Formbox">
            <div>
                <label className="label">Username</label>
            </div>

            <div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>

            <div>
                <label className="label">Password</label>
            </div>
            
            <div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
            </div>

            <div>
                <button className="button" style={{marginTop:'20px'}} type="submit">Log In</button>
            </div>
            </div>

        </form>
        </div>
    
    </>

    )



}

export default Login;