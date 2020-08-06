import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
import AddProject from './AddProject'; // <== !!!
 
class ProjectList extends Component {
  constructor(){
      super();
      this.state = { projects: [] };
  }
 
  getAllProjects = () =>{
    axios.get(`http://localhost:3000/api/projects`)
    .then(response => {
      this.setState({
        projects: response.data
      })
    })
  }
 
  componentDidMount() {
    this.getAllProjects();
  }
 
  render() {

    return(
      <div className="pt-5">
      <div style={{width: '60%', float:"left", paddingLeft: "50px"}}>
        { this.state.projects.map( project => {
          return (
            <div key={project._id}>
              <Link to={`/projects/${project._id}`}>
                <h3>{project.title}</h3>
              </Link>
              <p style={{maxWidth: '400px'}} >{project.description}</p>
              {/*  added so the tasks can be displayed:   */}
              <ul>
                { project.tasks.map((task, index) => {
                  return <Link key={index} to={`/projects/${project._id}/tasks/${task._id}`}><li>{task.title}</li></Link>
                }) }
              </ul>  
            </div>
          )})
        }
      </div>
      <div style={{width: '30%', float:"right", paddingRight: "50px"}}>
          <AddProject getData={() => this.getAllProjects()}/>
      </div>
    </div>
    )
  }
}
 
export default ProjectList;