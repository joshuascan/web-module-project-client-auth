// import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import FriendsList from "./Components/FriendsList";
import PrivateRoute from "./Components/PrivateRoute";
import axiosWithAuth from "./utils/axiosWithAuth";
import EditFriend from "./Components/EditFriend";

function App() {
  const logout = () => {
    axiosWithAuth()
      .post("/api/logout")
      .then((res) => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isAuth = localStorage.getItem("token");

  return (
    <Router>
      <div className="App">
        <h1>Friends App</h1>
        {!isAuth ? <Link to="/login">Login</Link> : <span></span>}
        {isAuth ? <Link to="/friends">Friends</Link> : <span></span>}
        <Link onClick={logout}>Logout</Link>
      </div>

      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/friends" component={FriendsList} />
        <PrivateRoute exact path="/edit-friend/:id" component={EditFriend} />
        <Route component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
