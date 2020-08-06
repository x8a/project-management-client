import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
 
class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
 
  componentDidMount(){
    this.getTheTask();
  }
 
  getTheTask = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:3000/api/projects/${params.id}/tasks/${params.taskId}`)
    .then( response =>{
      const theTask = response.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }
 
  render(){
    return(
      <div style={{width: '60%', padding: "0px 50px", paddingTop: "10px"}}>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <Link className="btn btn-secondary" to={`/projects/${this.props.match.params.id}`}>Back to the project</Link>
      </div>
    )
  }
}
 
export default TaskDetails;