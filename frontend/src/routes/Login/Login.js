import {useState} from 'react';
import {useNavigate} from 'react-router';
import Auth from '../../services/auth';

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
    <header> Login </header>    
    <form onSubmit={submit}>
        <div>
            <label>Username</label>
        </div>

        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </div>

        <div>
            <label>Password</label>
        </div>
        
        <div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
        </div>

        <div>
            <button type="submit">Log In</button>
        </div>

    </form>
    
    
    </>

    )



}

export default Login;