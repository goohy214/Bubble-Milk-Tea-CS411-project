import React from 'react';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Ingredient from './components/Ingredient';
import Calculator from './components/Calculator';

function App()  {
  return (
    <BrowserRouter>
     <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/edit" component={Edit} />
      <Route path="/ingredient" component={Ingredient} />
      <Route path="/calculator" component={Calculator} />
     </Switch>
    </BrowserRouter>
);
}

export default App;