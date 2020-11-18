import React, { Component } from "react";
import "./Menu.css";
import Axios from 'axios';
import { Meal } from "../calculator/index";
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
  };

  componentDidMount(){
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

  render() {
    let x;
    if (!this.state.isFav) {
      x = 
      <tbody>
        {this.state.meals.map((meal) => (
          <Meal
            key={meal.text}
            meal={meal}
            showTab={false}
          />
        ))}
      </tbody>
    } else {
      x = <tbody>favorite</tbody>
    }
    return (
      <div className="container">
        <div className="jumbotron">
          <h2>Ingredients</h2>
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
    );
  }
}

export default Menu;
