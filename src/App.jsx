import {useState, useEffect} from "react";
import * as API from "./services/characters";


export function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    API.getAllCharacters().then(setCharacters);
  }, []);

  console.log(characters);

  return (
    <>
      <h1>Dragon Ball Database</h1>
      <ul>
        {characters.map(character=> (
          <li key={character.id}>
            {character.name}
          </li>  
        ))}
      </ul>      
    </>
  )
}


