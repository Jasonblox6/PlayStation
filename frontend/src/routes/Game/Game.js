import { useEffect } from 'react';
import './Game.css';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router';

function Game () {

    //useNavigate allows easy re-rerouting
    const navigate = useNavigate();
    const params = useParams();

    //Needs to know the user - so that we can check if they own the game.
    //Needs to know the game - so that we can display the info.
    //Needs to know if the user owns the game - so that we can handle that.

    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [game, setGame] = useState();
    const [owns, setOwns] = useState();

    //On refresh
    useEffect(() =>{
        //Get the game data and set it
       fetch(`http://localhost:9000/games/get/${params.id}`).then(async (res) =>{
           setGame(await res.json());
       });

       //Check if the user owns the game or not and set it
       fetch(`http://localhost:9000/users/owns/${params.id}`, {
            method:"POST",
            headers: {Accept: "application/json, text/plain, */*", "Content-Type": "application/json"},
            body:JSON.stringify({userId:userId})}).then(async (res) =>{
            setOwns(await res.text());
    });
    
    }, []);

    //Simple date formatter for the release date
    const formatDate = (date) => {
        var d = new Date(game.releaseDate)
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
    }

    //Add to library function - sets ownership to true also.
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

    //Remove from library function - sets ownership to false also.
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

    //If we don't find the game somehow, we don't display the page.
    if (!game){
        return;
    }

    //Otherwise we show the game, with the relevant add/remove from library option.
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
            <button className='GameButtonAdd' onClick={addToLibrary}>Add To Library</button>
            }
            {owns === "owned" &&           
            <button className='GameButtonRemove' onClick={removeFromLibrary}>Remove From Library</button>
            }
            </div>
    </div>
    )

}

export default Game;