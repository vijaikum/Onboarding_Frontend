import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import PrivateRoute from '../Components/PrivateRoute'

import LoginPage from '../Pages/Login'
import HomePage from '../Pages/Home'
import CreateCustomer from "../Pages/CreateCustomer";

class App extends Component {

  state = {
    isAuthenticated: false,
    user: {
      userName: '',
      userRole: ''
    }
  }

  handleLogin = (result) => {
    const data = JSON.parse(result);
    this.setState(
      {
        isAuthenticated: data.authVal,
        user: data.user
      }
    );
  }

  handleLogout = () => {
    this.setState({
      isAuthenticated: false,
      user: {userName: '', userRole: ''}
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="*">
            <AppHeader isLoggedIn={this.state.isAuthenticated} user={this.state.user} isAuthenticated={this.handleLogin}
              isLoggedOut={this.handleLogout}></AppHeader>
          </Route>
          <div className="App-Content">
            <Route exact path="/login">
              <LoginPage isAuthenticated={this.handleLogin} />
            </Route>
            <PrivateRoute exact path="/" component={HomePage} isLoggedIn={this.state.isAuthenticated} />
            <PrivateRoute exact path="/addcustomer" component={CreateCustomer} isLoggedIn={this.state.isAuthenticated} />
          </div>
          <Route path="*" component={AppFooter} />
        </Router>
      </div>
    );
  }
}
export default App;
