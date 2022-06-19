import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PokemonList from "./components/pokemons-list.component";
import Evolutions from "./components/show-evolutions-component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/pokemons"} className="navbar-brand">
            RBS Test
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/pokemons"} className="nav-link">
              Pokemons
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/evolutions"} className="nav-link">
                Help
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/pokemons"]} component={PokemonList} />          
            <Route exact path="/evolutions" component={Evolutions}  />          
          </Switch>
        </div>
      </div>
    );
  }  
}

export default App;
