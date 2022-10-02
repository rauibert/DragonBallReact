import {useState, useEffect} from "react";
import * as API from "./services/characters";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/logo2.png';


export function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    API.getAllCharacters().then(setCharacters);
  }, []);

  console.log(characters);

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#inicio">
              <img src={ logo } 
                width="80"
                className="d-inline-block align-middle" 
                alt="" />{' '}
                Dragonball Database
            </Navbar.Brand>
          </Container>  
        </Navbar>        
      </header>
      <div className="container">
        <ul>
          {characters.map(character=> (
            <li key={character.id}>
              {character.name}
            </li>  
          ))}
        </ul> 
      </div>     
    </>
  )
}


