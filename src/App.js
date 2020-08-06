import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
 
import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetail from './components/tasks/TaskDetail'
import Map from './components/Map'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Profile from './components/Profile';
import ProtectedRoute from './auth/protected-route';
 
class App extends Component {

  constructor(props){
    super(props)
    this.state = { 
      loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null 
    };
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
    this.setState({
      loggedInUser: userObj
    }, () => {
      localStorage.setItem('loggedInUser', JSON.stringify(this.state.loggedInUser))
    })
  }

  render() {
      return (
        <div className="App">
          <Navbar user={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/projects" render={(props) => <ProjectList {...props} user={this.state.loggedInUser} key={this.state.loggedInUser} />}/>
            <Route exact path="/projects/:id" render={(props) => <ProjectDetails {...props} user={this.state.loggedInUser}/>} />
            <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetail} />
            <Route exact path='/signup' render={(props) => <Signup {...props}  getUser={this.getTheUser}/>}/>
            <Route exact path='/login' render={(props) => <Login {...props}  getUser={this.getTheUser}/>}/>
            <Route exact path="/logout" render={(props) => <Logout {...props} callback={this.getTheUser} />} />
            <Route exact path="/map" component={Map} />
            <ProtectedRoute 
              path="/profile" 
              user={this.state.loggedInUser}
              component={Profile}
            />
          </Switch>
        </div>
      )
  }
}
 
export default App;