import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import './RecipeApp.css';
import Navbar from "../navbar";
import Axios from 'axios';

const RecipeApp = () => {
  const APP_ID = "4aa63c35"
  const APP_KEY = "fd775e6c1f3740a4d991b4a531137721"

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('test');

  useEffect(() =>{
    getRecipes();
  }, [query]);

  //modify here to access recipes in mongoDB
  const getRecipes = async () => {
    Axios.post(`http://127.0.0.1:8080/recipe/search`, {"name": query})
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
      const res = response.data;
      setRecipes(res);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div>
      <Navbar name="profile"/>

      <div className="RecipeApp">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type ="submit">
            Search
          </button>
        </form>
        <div className={"recipes"}>
          {recipes.map((recipe, i) => (
            <Recipe
              key={i}
              title={i}
              ingredients={recipe}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeApp;
