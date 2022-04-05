import {useState} from 'react';
import {useNavigate} from 'react-router';
import Auth from '../../services/auth';
import './Login.css';

function Login ({handleLogin}) {

    //We'll need to input the username and password, and display errors if any occur
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    //On submission of the login form
    const submit = async(e) => {
        e.preventDefault();
        //Try to log the user in
        const res = await Auth.login(username, password);
        //If we're successful, we return the userId and Token, so we can pass that on
        if (res !== "error"){
            handleLogin(res);
        }
        //If we aren't however, we set the error text
        else{
            setErrorText("Failed To Log In")
        }
    }


    return(
        <div className="Container"> 
            {/* Use a form and call the submit method on submit */}
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

                {/* Only display the error if there is one */}
                {errorText &&
                <div className="errorlabel">
                    <label>{errorText}</label>
                </div>
                }

                </div>

            </form>
        </div>
    

    )



}

export default Login;