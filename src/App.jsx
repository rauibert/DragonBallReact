import {useState, useEffect} from "react";
import * as API from "./services/characters";
import "./App.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/logo2.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


export function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  
  const filteredCharacters = () => {
    return characters.slice (currentPage,currentPage + 12);
  };

  const nextPage = () => {
    let finalPage = characters.length - 12;
    if(currentPage < finalPage){
      setCurrentPage(currentPage + 12);
    }else{
      console.log('No hay más paginas');
    }    
  };

  const prevPage = () => {
    if(currentPage>0){
      setCurrentPage(currentPage - 12);
    }    
  };


  useEffect(() => {
    API.getAllCharacters().then(setCharacters);
  }, []); 

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
      <div className="paginator">
        <Button onClick={prevPage}>Anterior</Button>        
        <Button onClick={nextPage}>Siguiente</Button>
      </div>
      <div className="container">
        <div className="cardContainer">
          {filteredCharacters().map(character=> (
              <Card style={{ width: '18rem' }} id={character.id}>
                <Card.Img variant="top" style={{height:'55vh'}} src={character.imageUrl} />
                
                  <Card.Title>{character.name}</Card.Title>
                
                  <ListGroup variant="flush">
                    <ListGroup.Item>Planeta de origen: {character.originplanet}</ListGroup.Item>
                    <ListGroup.Item>Especie: {character.specie}</ListGroup.Item>
                    <ListGroup.Item>Role: {character.role}</ListGroup.Item>  
                  </ListGroup>
                <Card.Body>                
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>               
          ))}
        </div>
      </div>  
      <div className="paginator">
        <Button onClick={prevPage}>Anterior</Button>        
        <Button onClick={nextPage}>Siguiente</Button>
      </div>
      <footer>@Rauibert</footer>   
    </>
  )
}


