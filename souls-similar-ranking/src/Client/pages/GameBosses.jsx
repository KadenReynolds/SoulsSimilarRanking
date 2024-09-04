import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function GameBosses({token}) {
  const [bosses, setBosses] = useState([])
  const [game, setGame] = useState({})

  const navigate = useNavigate();
  const { gameID } = useParams();
  
  useEffect (() => {
    getGameByGameID();
    getBossesByGameID();
  }, [])

  async function getBossesByGameID() {
    try {
      const response = await fetch(`http://localhost:3000/api/bosses/${gameID}`)
      const result = await response.json()

      console.log(result.bosses)

      setBosses(result.bosses)
    }
    catch(err){
      console.error(err.message)
    }
  }

  async function getGameByGameID() {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${gameID}`)
      const result = await response.json()

      console.log(result.game[0])

      setGame(result.game[0])
    }
    catch(err){
      console.error(err.message)
    }
  }


  
  return (
    <>
      <h1>{game.name}</h1>
        <div className="bossGameMasterDiv">
          {bosses.map((boss) => {
            return(
                <div key={boss.boss_id} className="bossDiv">
                  <h3>{boss.name}</h3>
                  <img src={boss.boss_image} alt="Photo Not Available" />
                  <br />
                  <h5>Lore: <i>{boss.lore}</i></h5>
                  <h5>Appearence: <i>{boss.appearence}</i></h5>
                  <h5>Difficulty: <i>{boss.difficulty}</i></h5>
                  <h5>Entertainment: <i>{boss.entertainment}</i></h5>
                  <h5>Level: <i>{boss.level}</i></h5>
                  <h5>Annoyance: <i>{boss.annoyance}</i></h5>
                  <h4>LADELA: <i>{boss.ladela}</i></h4>
                  <p>"{boss.description}"</p>
                 </div>
            )
          })}
          {!token
            ?
            <></>
            :
            <button onClick={() => {navigate('/bosses/newboss')}}>+ Add New Boss</button>
          }
        </div>
    </>
  )
}