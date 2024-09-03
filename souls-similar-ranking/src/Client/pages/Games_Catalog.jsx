import { useState, useEffect } from "react"


export default function Games_Catalog() {
  const [ games, setGames ] = useState([{}]);


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

  return (
    <>
      <h1>Games</h1>
      {games.map((game) => {
        return(
          <div className="gameDiv" key={game.game_id}>
            <h3>{game.name}</h3>
            <img src={game.game_image} alt="Image Not Available"/>
          </div>
        )
      })}
    </>
  )
}