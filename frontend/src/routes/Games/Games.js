import { useEffect } from 'react';
import './Games.css';
import {useState} from 'react';
import {useNavigate} from 'react-router';

function Games ({token, id}) {

    //Needs to know what games exist
    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [games, setGames] = useState();

    useEffect(() =>{
        //Gets all of the games
       fetch(`http://localhost:9000/games/getAll`).then(async (res) =>{
           setGames(await res.json());
       });
    
    }, []);

    //If there are no games, we don't show anything
    if (!games){
        return;
    }

    //Otherwise we show a list of games mapped to html
    return(
    <div className="Container">
        <div className="GameList">
            {/* Use game's id as the key for mapping */}
            {games.map(game => (
            <div onClick={()=> navigate(`/games/${game._id}`)} key={game._id} className="Game">
                <img className="GameImage" src={game.boxArt}></img>
                {game.name}
            </div>))}
        </div>
    </div>
    )

}

export default Games;