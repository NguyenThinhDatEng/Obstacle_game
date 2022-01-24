import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "../components/signup/signup";
import Ready from "../components/ready/ready";
import Game from "../components/game/game";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/ready" component={Ready} />
        <Route exact path="/game" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
