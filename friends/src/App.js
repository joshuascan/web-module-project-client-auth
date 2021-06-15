// import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Friends App</h1>
      </div>

      <Switch>
        <Route component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
