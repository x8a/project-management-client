import React, { Component } from 'react';
import axios from 'axios';
 
class EditProject extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theProject.title, 
        description: this.props.theProject.description
    }
  }
 
    
  handleFormSubmit = (event) => {
    const body = {
        title: this.state.title,
        description: this.state.description,
      };

    event.preventDefault();
 
    axios.put(`http://localhost:3000/api/projects/${this.props.theProject._id}`, body, {withCredentials:true})
    .then( () => {
        this.props.getTheProject();
        // after submitting the form, redirect to '/projects'
        this.props.history.push('/projects');    
    })
    .catch( error => console.log(error) )
  }
 
  handleChangeTitle = (event) => {  
    this.setState({
      title:event.target.value
    })
  }
 
  handleChangeDesc = (event) => {  
    this.setState({
      description: event.target.value
    })
  }
 
  render(){
    return (
      <div>
        <hr />
        <h3>Edit Project</h3>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
          <label>Title:</label>
          <input className="form-control" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
          </div>
          <div className="form-group">
          <label>Description:</label>
          <textarea className="form-control" name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          </div>
          
          <input className="btn btn-primary" type="submit" value="Save Changes" />
        </form>
      </div>
    )
  }
}
 
export default EditProject;