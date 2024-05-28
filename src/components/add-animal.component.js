import React, { Component } from "react";
import AnimalDataService from "../services/animal.service";

export default class AddAnimal extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMale = this.onChangeMale.bind(this);
    this.saveAnimal = this.saveAnimal.bind(this);
    this.newAnimal = this.newAnimal.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "", 
      male: false,

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeMale(e) {
    this.setState({
      male: e.target.value
    });
  }

  saveAnimal() {
    var data = {
      name: this.state.name,
      description: this.state.description
    };

    AnimalDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          male: response.data.male,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newAnimal() {
    this.setState({
      id: null,
      name: "",
      description: "",
      male: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newAnimal}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="male">Male</label>
              <input
                type="boolean"
                className="form-control"
                id="male"
                required
                value={this.state.male}
                onChange={this.onChangeMale}
                name="male"
              />
            </div>

            <button onClick={this.saveAnimal} className="btn btn-success">
              Add
            </button>
          </div>
        )}
      </div>
    );
  }
}
