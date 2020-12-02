import React, { Component } from "react";
import { RecipeForm, Meal} from "./calculator/index";
import 'react-circular-progressbar/dist/styles.css';
import Navbar from "./navbar";
import Axios from 'axios';

class AddRecipe extends Component {
  state = {
    meals: [],
    name: ""
  };

  addMeal = (meal) => {
    this.setState({
      meals: [meal, ...this.state.meals],
    });
  };

  onDelete = (id) => {
    this.setState({
      meals: this.state.meals.filter((meal) => meal.id !== id),
    });
  };

  //implement API here, the recipe is stored in 'meals'.
  addRecipe = () => {
    var response = {
      "name": this.state.name,
      "ingredients": []
    }
    // for (var i = 0; i < this.state.meals.length; i++) {
    //   response.ingredients[this.state.meals[i].text] = this.state.meals[i].calorie;
    // }
    this.state.meals.map((meal) => {
        response.ingredients.push({"name": meal.text, "quantity":meal.calorie})
    })
    console.log(JSON.stringify(response));
    this.handleRequest1(response);
    this.handleRequest2(response.name);
  };

  clear = () => {
    this.setState({name: '', meals: []});
  }

  myChangeHandler = (event) => {
    this.setState({name: event.target.value});
  }

  handleRequest1 = (data) => {
    Axios.post(`http://127.0.0.1:8080/recipe/add`, data)
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
    })
    .catch(error => {
      console.log(error)
    })

  }

  handleRequest2 = (name) => {
    Axios.post(`http://127.0.0.1:8000/recipe/add`, {
        "recipe_name": name,
        "username": `${localStorage.getItem('username')}`
    })
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  render() {
    return (
        <div>
            <Navbar name="home" />
            <div className="container">
                <div className="jumbotron">
                <h2>Recipe Adder</h2>
                <hr />
                <p>Enter your recipe name</p>
                <input
                    type='text'
                    value={this.state.name}
                    onChange={this.myChangeHandler}
                />
                <hr />
                <RecipeForm onsubmit={this.addMeal} />
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Ingredients</th>
                        <th>Quantity (gram)</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.meals.map((meal) => (
                        <Meal
                        key={meal.id}
                        meal={meal}
                        showTab={true}
                        onDelete={() => this.onDelete(meal.id)}
                        />
                    ))}
                    <tr>
                        <td>Total ingredients:</td>
                        <td>
                        {this.state.meals.length}
                        </td>
                        <td />
                    </tr>
                    </tbody>
                </table>
                <button type="button" className="btn btn-success" onClick={this.addRecipe}>
                    Add Recipe
                </button>
                <br/>
                <br/>
                <button type="button" className="btn btn-success" onClick={this.clear}>
                    Clear Recipe
                </button>
                </div>
            </div>
      </div>
    );
  }
}

export default AddRecipe;
