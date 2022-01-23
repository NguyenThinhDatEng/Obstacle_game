import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "../components/signup/signup";
import Home from "../components/home/home";
import Game from "../components/game/game";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
