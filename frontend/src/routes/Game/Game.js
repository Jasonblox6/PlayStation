import { useEffect } from 'react';
import './Game.css';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router';

function Game () {

    const navigate = useNavigate();
    const params = useParams();

    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [game, setGame] = useState();
    const [owns, setOwns] = useState();

    useEffect(() =>{
       fetch(`http://localhost:9000/games/get/${params.id}`).then(async (res) =>{
           setGame(await res.json());
       });

       fetch(`http://localhost:9000/users/owns/${params.id}`, {
            method:"POST",
            headers: {Accept: "application/json, text/plain, */*", "Content-Type": "application/json"},
            body:JSON.stringify({userId:userId})}).then(async (res) =>{
            setOwns(await res.text());
    });
    
    }, []);

    const formatDate = (date) => {
        var d = new Date(game.releaseDate)
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
    }

    const addToLibrary = () => {
        fetch(`http://localhost:9000/users/addgame`, {
            method:"POST",
            headers: {Accept: "application/json, text/plain, */*", "Content-Type": "application/json"},
            body:JSON.stringify({userId:userId, gameId:params.id})}).then(async (res) =>{
            if (res.status === 201){
                setOwns("owned");
            }
        });
    }

    
    const removeFromLibrary = () => {
        fetch(`http://localhost:9000/users/removegame/`, {
            method:"POST",
            headers: {Accept: "application/json, text/plain, */*", "Content-Type": "application/json"},
            body:JSON.stringify({userId:userId, gameId:params.id})}).then(async (res) =>{
            if (res.status === 201){
                setOwns("unowned");
            }
        });
    }


    if (!game){
        return;
    }

    return(
    <div className="Container">
        <div onClick={()=> navigate(`/library/${game._id}`)} key={game._id} className="GameDisplay">
            <img className="GameImageDisplay" src={game.boxArt}></img>
            <table>
                <tr><th>Name:</th> <td>{game.name}</td></tr>
                <tr><th>Platform:</th>  <td>{game.platform}</td></tr>
                <tr><th>Genre:</th>  <td>{game.genre}</td></tr>
                <tr><th>Release Date:</th>  <td>{formatDate(game.releaseDate)}</td></tr>
                <tr><th>No. of Players:</th>  <td>{game.numPlayers}</td></tr>
                <tr><th>Publisher:</th>  <td>{game.publisher}</td></tr>
            </table>
            {owns === "unowned" &&
            <button onClick={addToLibrary}>Add To Library</button>
            }
            {owns === "owned" &&           
            <button onClick={removeFromLibrary}>Remove From Library</button>
            }
            </div>
    </div>
    )

}

export default Game;