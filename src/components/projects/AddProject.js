import React, { Component } from "react";
import axios from "axios";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const body = {
      title: this.state.title,
      description: this.state.description,
    };
    axios
      .post("http://localhost:3000/api/projects", body, {withCredentials:true})
      .then(() => {
        // this.props.getData();
        // Clean the form
        this.setState({ title: "", description: "" });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
      <h3>Add a Project</h3>
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

          <input className="btn btn-success" type="submit" value="Create project" />
        </form>
      </div>
    );
  }
}

export default AddProject;
