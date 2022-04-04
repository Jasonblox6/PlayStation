import {useState} from 'react';
import {useNavigate} from 'react-router';
import Auth from '../../services/auth';
import './Signup.css';

function Signup ({handleLogin}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorText, setErrorText] = useState("");


    const submit = async(e) => {
        e.preventDefault();
        var resp = await Auth.signUp(username, password, email);
        setErrorText(resp.message);
        console.log(resp);
        if (resp.status === "success"){
            navigate("/login");
        }

    }


    return(
    <>
        <div className="Container"> 
        

        <form onSubmit={submit}>

            <div className="Formbox">
            <div>
                <label className="label">Email</label>
            </div>

            <div>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>

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
                <button className="button" style={{marginTop:'20px'}} type="submit">Sign Up</button>
            </div>

            {errorText &&
            <div className="errorlabel">
                <label>{errorText}</label>
            </div>
            }

            </div>

        </form>
        </div>
    
    </>

    )



}

export default Signup;