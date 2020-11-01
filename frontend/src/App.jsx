import React from 'react';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Profile from './Profile';

function App()  {
  return (
    <BrowserRouter>
     <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
    </Switch>
    </BrowserRouter>
);
}

export default App;