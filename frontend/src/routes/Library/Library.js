import { useEffect } from 'react';
import './Library.css';
import {useState} from 'react';
import {useNavigate} from 'react-router';

function Library ({token, id}) {

    //Need the current user so that we can display their library
    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [user, setUser] = useState();

    useEffect(() =>{
        //Gets and sets the user
       fetch(`http://localhost:9000/users/get/${userId}`).then(async (res) =>{
           setUser(await res.json());
       });
    
    }, []);


    //If we somehow don't have a user, don't show anything
    if (!user){
        return;
    }

    //Otherwise we show a list of the user's owned games
    return(
    <div className="Container">
        <div className="GameList">
        {/* We map the user's owned games in the same way as the all games page */}
        {user.ownedGames.map(game => (
            <div onClick={()=> navigate(`/library/${game._id}`)} key={game._id} className="Game">
                <img className="GameImage" src={game.boxArt}></img>
                {game.name}
            </div>))}
        </div>
    </div>
    )

}

export default Library;