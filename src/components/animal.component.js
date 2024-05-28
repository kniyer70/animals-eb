import React, { Component } from "react";
import AnimalDataService from "../services/animal.service";
import { withRouter } from '../common/with-router';

class Animal extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMale = this.onChangeMale.bind(this);
    this.getAnimal = this.getAnimal.bind(this);
    this.updateMale = this.updateMale.bind(this);
    this.updateAnimal = this.updateAnimal.bind(this);
    this.deleteAnimal = this.deleteAnimal.bind(this);

    this.state = {
      currentAnimal: {
        id: null,
        name: "",
        description: "",
        male: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAnimal(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAnimal: {
          ...prevState.currentAnimal,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentAnimal: {
        ...prevState.currentAnimal,
        description: description
      }
    }));
  }

  onChangeMale(e) {
    const male = e.target.value;
    
    this.setState(prevState => ({
      currentAnimal: {
        ...prevState.currentAnimal,
        male: male
      }
    }));
  }

  getAnimal(id) {
    AnimalDataService.get(id)
      .then(response => {
        this.setState({
          currentAnimal: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMale(status) {
    var data = {
      id: this.state.currentAnimal.id,
      name: this.state.currentAnimal.name,
      description: this.state.currentAnimal.description,
      male: status
    };

    AnimalDataService.update(this.state.currentAnimal.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAnimal: {
            ...prevState.currentAnimal,
            male: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAnimal() {
    AnimalDataService.update(
      this.state.currentAnimal.id,
      this.state.currentAnimal
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The animal was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAnimal() {    
    AnimalDataService.delete(this.state.currentAnimal.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/animals');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAnimal } = this.state;

    return (
      <div>
        {currentAnimal ? (
          <div className="edit-form">
            <h4>Animal</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentAnimal.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentAnimal.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Gender:</strong>
                </label>
                {currentAnimal.male ? "Male" : "Female"}
              </div>
            </form>

            {currentAnimal.male ? (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updateMale(false)}
              >
                Female
              </button>
            ) : (
              <button
                className="btn btn-primary mr-2"
                onClick={() => this.updateMale(true)}
              >
                Male
              </button>
            )}

            <button
              className="btn btn-danger mr-2"
              onClick={this.deleteAnimal}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateAnimal}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Animal...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Animal);