import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


export default function Games_Catalog({token}) {
  const [ games, setGames ] = useState([{}]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchGames()
  },[])

  async function fetchGames(){

    let API = '/api'

    try {
      const response = await fetch(`http://localhost:3000/api/games`)
      const result = await response.json()

      console.log(result.games)

      setGames(result.games)
    }
    catch(err){
      console.error(err.message)
    }
  }

  async function deleteGame(game_id){
    try {
      await fetch(`http://localhost:3000/api/games/${game_id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
      })
      window.location.reload();
    }
    catch(err){
      console.error(err.message)
    }
  }

  function handleDeleteClick (game_id){
    deleteGame(game_id)
  }

  return (
    <>
      <h1>Games</h1>
      <div className="gameMasterDiv">
        {games.map((game) => {
          return(
            <div className="gameDiv" key={game.game_id} onClick={() => {navigate(`/bosses/${game.game_id}`)}}>
              <img src={game.game_image} alt="Image Not Available"/>
              <div>
                <h3 className="gameName">{game.name}</h3>
                {!token
                  ?
                  <></>
                  :
                  <>
                    <button className="gameEditButton">i</button>
                    <button className="gameDeleteButton" onClick={() => {handleDeleteClick(game.game_id)}}>X</button>
                  </>
                }
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}