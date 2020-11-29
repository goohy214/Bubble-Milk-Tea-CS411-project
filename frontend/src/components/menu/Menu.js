import React, { Component } from "react";
import "./Menu.css";
import Axios from 'axios';
import { Meal } from "../calculator/index";
import Navbar from "../navbar";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CircularProgressbar } from 'react-circular-progressbar';
import {Button, Alert, Container} from "react-bootstrap";
import 'react-circular-progressbar/dist/styles.css';

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
    consumedCal: 0,
    isInvalidCal: false
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

  handleRequest3 = (consumedCal) => {
    Axios.post(base_url + 'ingredient/check', {
      'username' : `${localStorage.getItem('username')}`,
      'consumedCal': consumedCal
    })
    .then(response => {
      console.log(response)
      console.log(response.status + " " + response.statusText)
      if(response.data[0]) {
        this.setState({
          consumedCal:response.data[0]
        });
      } else {
        this.setState({
          isInvalidCal:true
        })
        console.log(response.data);
      }

    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount(){
    this.handleRequest1();
    this.handleRequest2();
    this.handleRequest3(0);
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

  handleOnSubmit() {
    const reducer = this.state.selectedMeals.reduce(
      (totalCalories, meal) => totalCalories + meal.calorie,
      0
    )
    this.setState({
      selectedMeals:[]
    })
    this.handleRequest3(reducer);
  }

  handelAlertOnClose = () => {
    this.setState({
      isInvalidCal: false
    });
  }

  render() {
    const eaten = this.state.consumedCal;
    const {isInvalidCal, meals, favMeals, selectedMeals}= this.state
    const total = 1500;
    let x;
    if (!this.state.isFav) {
      x = 
      <tbody>
        {meals.map((meal, i) => (
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
        {favMeals.map((meal, i) => (
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
        <div>
          {isInvalidCal && (
            <Alert variant="danger" onClose={() => this.handelAlertOnClose()} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                Stop drinking any more milk tea!
              </p>
          </Alert>
          )}
        </div>
        
        <div className="container-fluid mt-4">
          <Container fluid="md">
            <div className="jumbotron" >
              <h2>Ingredients</h2>

              <div className="graph">
                <div className="container">
                  <CircularProgressbar value={eaten/total * 100} text={`${total - eaten} cal` } />
                </div>
              </div>

              <hr />

              <table className="table table-striped" >
                <thead>
                  <tr>
                    <th>Ingredients</th>
                    <th>Calories</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {selectedMeals.map((meal, i) => (
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
                        {selectedMeals.reduce(
                          (totalCalories, meal) => totalCalories + meal.calorie,
                          0
                          )}
                    </td>
                    <td />
                  </tr>
                </tbody>
              </table>

              <Button onClick={() => this.handleOnSubmit()}>
                Submit
              </Button>

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
          </Container>
        </div>    
      </div>
    );
  }
}

export default Menu;
