import {useNavigate} from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/catalog_games")
  }
  return(
    <>
      <h1>Welcome</h1>
      <button onClick={handleClick}>Games</button>
    </>
  )
}