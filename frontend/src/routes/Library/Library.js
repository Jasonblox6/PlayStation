import { useEffect } from 'react';
import './Library.css';
import {useState} from 'react';
import {useNavigate} from 'react-router';

function Library ({token, id}) {

    const navigate = useNavigate();
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [user, setUser] = useState();

    useEffect(() =>{
       fetch(`http://localhost:9000/users/get/${userId}`).then(async (res) =>{
           setUser(await res.json());
           console.log(user);
       });
    
    }, []);


    if (!user){
        return;
    }

    return(
    <div className="Container">
        <div className="GameList">
        {user.ownedGames.map(game => (<div onClick={()=> navigate(`/library/${game._id}`)} key={game._id} className="Game"><img className="GameImage" src={game.boxArt}></img>{game.name}</div>))}
        </div>
    </div>
    )

}

export default Library;