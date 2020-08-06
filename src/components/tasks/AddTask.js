import React, { Component } from 'react';
import axios from 'axios';
 
class AddTask extends Component {
  constructor(props){
      super(props);          //             will help us to toggle add task form   
                            //                      |
      this.state = { title: "", description: "", isShowing: false };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const projectID = this.props.theProject._id; 

    axios.post("http://localhost:3000/api/tasks", { title, description, projectID })
    .then( () => {
          // after submitting the form, retrieve project one more time so the new task is displayed as well 
          //              |
        this.props.getTheProject();
        this.setState({title: "", description: ""});
    })
    .catch( error => console.log(error) )
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
 
  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }
 
  showAddTaskForm = () => {
    if(this.state.isShowing){
        return (
          <div className="pt-3">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>

              <input
                className="btn btn-success"
                type="submit"
                value="Save changes"
              />
            </form>
          </div>
        );
    }
  }
 
  render(){
    return(
      <div>
            <hr />
            <button className="btn btn-success" onClick={() => this.toggleForm()}>Add task</button>
            { this.showAddTaskForm() }
      </div>
    )
  }
}
 
export default AddTask;