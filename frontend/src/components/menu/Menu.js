import React, { Component } from "react";
import "./Menu.css";
import Axios from 'axios';
import { Meal } from "../calculator/index";
import Navbar from "../navbar";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const base_url = 'http://127.0.0.1:8000/';
class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleIngClick = this.handleIngClick.bind(this);
    this.state.isFav = false;
  }

  state = {
    meals: [],
    selectedMeals: [],
    favMeals:[],
    countSelected: 0,
  };

  handleRequest1 = () => {
    Axios.get(base_url + 'ingredient/get')
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
      response.data[0].forEach(element => {
        this.setState({
          meals: [
            { text: element.name, calorie: element.calorie },
            ...this.state.meals
          ],
        })
      });
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleRequest2 = () => {
    Axios.post(base_url + 'ingredient/fav', {
      'username' : `${localStorage.getItem('username')}`,
    })
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
      response.data[0].forEach(element => {
        this.setState({
          favMeals: [
            { text: element.name, calorie: element.calorie },
            ...this.state.favMeals
          ],
        })
      });
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.handleRequest1();
    this.handleRequest2();
  }

  handleFavClick() {
    if (this.state.isFav) {
      this.setState({isFav: false});
    } else {
      this.setState({isFav: true});
    }
  }

  handleIngClick() {
    this.setState({isFav: false});
  }

  handleOnMenuAdd(selectedMeal) {
    const newCount = this.state.countSelected + 1;
    this.setState({
      selectedMeals: [...this.state.selectedMeals,
        {
          id: newCount, 
          text: selectedMeal.text, 
          calorie: selectedMeal.calorie
        }],
      countSelected: newCount,
    });
  }

  handleOnMenuDelete(id) {
    const newCount = this.state.countSelected - 1;
    this.setState({
      selectedMeals: this.state.selectedMeals.filter((meal) => meal.id !== id),
      countSelected: newCount
    });
  }

  render() {
    let x;
    if (!this.state.isFav) {
      x = 
      <tbody>
        {this.state.meals.map((meal, i) => (
          <Meal
            key={i}
            meal={meal}
            showMenuAddTab={true}
            onMenuAdd={() => this.handleOnMenuAdd(meal)}
          />
        ))}
      </tbody>
    } else {
      x = <tbody>
        {this.state.favMeals.map((meal, i) => (
          <Meal
            key={i}
            meal={meal}
            showMenuAddTab={true}
            onMenuAdd={() => this.handleOnMenuAdd(meal)}
          />
        ))}
      </tbody>
    }
    return (
      <div>
        <Navbar name="menu"/>
        
        <div className="container">
          <div className="jumbotron">
            <h2>Ingredients</h2>

            <hr />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ingredients</th>
                  <th>Calories</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.selectedMeals.map((meal, i) => (
                  <Meal
                    key={i}
                    meal={meal}
                    showMenuDeleteTab={true}
                    onMenuDelete={() => this.handleOnMenuDelete(meal.id)}
                  />
                ))}
                <tr>
                  <td>Total:</td>
                  <td>
                    <span role="img" aria-label="apple">🍎</span>
                    {this.state.selectedMeals.reduce(
                      (totalCalories, meal) => totalCalories + meal.calorie,
                      0
                    )}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>

            <FormGroup>
              <FormControlLabel
                control={<Switch checked={this.state.isFav} onChange={this.handleFavClick} />}
                label="Favorite"
              />
            </FormGroup>  

            <hr />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ingredients</th>
                  <th>Calories</th>
                  <th />
                </tr>
              </thead>
                {x}
            </table>

          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
