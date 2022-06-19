import http from "../http-common";

class PokemonDataService {
  getAll() {    
    return http.get("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");    
  }    
}

export default new PokemonDataService();