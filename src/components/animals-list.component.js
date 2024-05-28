import React, { Component } from "react";
import AnimalDataService from "../services/animal.service";
import { Link } from "react-router-dom";

export default class AnimalsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveAnimals = this.retrieveAnimals.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAnimal = this.setActiveAnimal.bind(this);
    this.removeAllAnimals = this.removeAllAnimals.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      animals: [],
      currentAnimal: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveAnimals();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveAnimals() {
    AnimalDataService.getAll()
      .then(response => {
        this.setState({
          animals: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAnimals();
    this.setState({
      currentAnimal: null,
      currentIndex: -1
    });
  }

  setActiveAnimal(animal, index) {
    this.setState({
      currentAnimal: animal,
      currentIndex: index
    });
  }

  removeAllAnimals() {
    AnimalDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentAnimal: null,
      currentIndex: -1
    });

    AnimalDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          animals: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, animals, currentAnimal, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-info"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Animals List</h4>

          <ul className="list-group">
            {animals &&
              animals.map((animal, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAnimal(animal, index)}
                  key={index}
                >
                  {animal.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAnimals}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentAnimal ? (
            <div>
              <h4>Animal</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentAnimal.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentAnimal.description}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>{" "}
                {currentAnimal.male ? "Male" : "Female"}
              </div>

              <Link
                to={"/animals/" + currentAnimal.id}
                className="btn btn-danger"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Animal...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
