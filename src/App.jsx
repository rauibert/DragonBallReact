import {useState, useEffect} from "react";
import * as API from "./services/characters";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/logo2.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


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
               <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={character.imageUrl} />
                <Card.Body>
                  <Card.Title>{character.name}</Card.Title>
                </Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Planeta de origen: {character.originplanet}</ListGroup.Item>
                    <ListGroup.Item>Especie: {character.specie}</ListGroup.Item>
                    <ListGroup.Item>Role: {character.role}</ListGroup.Item>  
                  </ListGroup>
                <Card.Body>                
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>   
            </li>  
          ))}
        </ul> 
      </div>     
    </>
  )
}


