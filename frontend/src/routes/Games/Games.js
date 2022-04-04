import { useEffect } from 'react';
import './Games.css';
import {useState} from 'react';
import {useNavigate} from 'react-router';

function Games ({token, id}) {

    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [games, setGames] = useState();

    useEffect(() =>{
       fetch(`http://localhost:9000/games/getAll`).then(async (res) =>{
           setGames(await res.json());
           console.log(games);
       });
    
    }, []);


    if (!games){
        return;
    }

    return(
    <div className="Container">
        <div className="GameList">
        {games.map(game => (<div onClick={()=> navigate(`/games/${game._id}`)} key={game._id} className="Game"><img className="GameImage" src={game.boxArt}></img>{game.name}</div>))}
        </div>
    </div>
    )

}

export default Games;