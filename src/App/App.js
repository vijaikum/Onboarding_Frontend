import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import PrivateRoute from '../Components/PrivateRoute'
import LoginPage from '../Pages/Login'
import HomePage from '../Pages/Home'

class App extends Component {
  state = {
    isAuthenticated: false,
    userName: '',
    userRole: ''
  }

  handleLogin = (result) => {
    const data = JSON.parse(result);
    this.setState(
      {
        isAuthenticated: data.authVal,
        userName: data.userName,
        userRole: data.userRole
      }
    );
  }
  
  handleLogout = () => {
    this.setState(
      {
        isAuthenticated: false,
        userName: '',
        userRole: ''
      }
    );
  }

  render() {
    return (
      <div className="App">        
        <AppHeader isLoggedIn={this.state.isAuthenticated} userName={this.state.userName} 
        userRole={this.state.userRole} isLoggedOut={this.handleLogout}></AppHeader>
        <div className="App-Content">
          <Router>
            <PrivateRoute exact path="/" component={HomePage} isLoggedIn={this.state.isAuthenticated} />
            <Route exact path="/login">
              <LoginPage isAuthenticated={this.handleLogin} />
            </Route>
          </Router>
        </div>
        <AppFooter></AppFooter>
      </div>
    );
  }
}
export default App;
