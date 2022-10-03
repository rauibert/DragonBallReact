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
  const [search, setSearch] = useState('');
  
  const filteredCharacters = () => {
    if(search.length == 0){
      return characters.slice (currentPage,currentPage + 12);
    }else{
      const filtered = characters.filter(
        character => character.name.toLowerCase().includes(search.toLowerCase()));
      
      return filtered.slice (currentPage,currentPage + 12);
    }    
  };

  const nextPage = () => {
    let finalPage = characters.length - 12;
    let numCharactersFiltered = characters.filter(character => character.name.includes(search)).length;

    console.log(numCharactersFiltered);
    console.log(currentPage);

    if(search){
      let finalPageSearch = numCharactersFiltered -12;
      if(currentPage < finalPageSearch){
        setCurrentPage(currentPage + 12);
      } else {
        console.log('No hay más paginas');
      }  
    }else{
      if(currentPage < finalPage){
        setCurrentPage(currentPage + 12);
      } else {
        console.log('No hay más paginas');
      }  
    }      
  };

  const prevPage = () => {
    if(currentPage>0){
      setCurrentPage(currentPage - 12);
    }    
  };

  const onSearchChange = (event) => {
    setCurrentPage(0);
    setSearch(event.target.value);
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
        <div className="busqueda">
          <input 
            type="text"
            id="search" 
            placeholder="Buscar personaje"
            value = { search }
            onChange = { onSearchChange }
          />
        </div><br/>
        <div className="botones">
          <Button onClick={prevPage}>Anterior</Button>        
          <Button onClick={nextPage}>Siguiente</Button>
        </div>       
      </div>
      <div className="container">
        <div className="cardContainer">
          {filteredCharacters().map(character=> (
              <Card style={{ width: '18rem', margin: '2px', padding: '4px' }} id={character.id}>
                <Card.Img variant="top" style={{height:'55vh'}} src={character.imageUrl} />
                
                  <Card.Title>{character.id}. {character.name}</Card.Title>
                
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


