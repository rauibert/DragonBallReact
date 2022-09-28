const API_URL = "https://dragon-ball-super-api.herokuapp.com/api";

export async function getAllCharacters(){
    try{
        const response = await fetch( `${API_URL}/characters`);
        const data = await response.json();
        return data;
    }catch(fail){
        console.error(fail);
    }
}


export async function getCharacterById(characterId){
    try{
        const response = await fetch(`${API_URL}/characters/${characterId}`);
        const data = await response.json();
        return data;
    }catch(fail){
        console.error(fail);
    }
}