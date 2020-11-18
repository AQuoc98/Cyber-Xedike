import React, { Component } from 'react';
import "./App.css";
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from "./store";

import HomePage from "./containers/home";
import TripListPage from "./containers/trip-list";
import ProfileDriverPage from "./containers/profile-driver";
import ProfilePage from "./containers/profile";
import BookTripPage from './containers/book-trip';
import TripHistoryPage from "./containers/trip-history";
import ProfileDriver from "./containers/profile-driver";
import setAuthToken from "./auth/set-auth";
import { setCurrentUser, actLogout } from "./actions/user-action";

class App extends Component {
  componentDidMount() {
    if (localStorage.jwtToken) {
      // check login global
      setAuthToken(localStorage.jwtToken);
      const decode = jwtDecode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decode));
      if (decode.exp < Math.floor(Date.now() / 1000)) {
        store.dispatch(actLogout);
      }
    }
  }


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact></Route>
          <Route path="/profile/driver/:driverId" component={ProfileDriverPage}></Route>
          <Route path="/profile" component={ProfilePage} ></Route>
          <Route path="/book-trip/:tripId" component={BookTripPage}></Route>
          <Route path="/driverProfile/:driverId" component={ProfileDriver}></Route>
          <Route path="/trips" component={TripListPage} ></Route>
          <Route path="/trips-history" component={TripHistoryPage}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
