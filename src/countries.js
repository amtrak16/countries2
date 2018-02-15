import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios';

class Countries extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blocCountries: []
    }

    this.getCountries = this.getCountries.bind(this)
    this.onTrack = this.onTrack.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.getCountries(nextProps)
  }

  getCountries(nextProps) {
    let apiVal = `https://restcountries.eu/rest/v2/regionalbloc/${nextProps.match.params.name}`
    axios.get(apiVal)
      .then((response) => {
        console.log(response.data)
        this.setState({ blocCountries: response.data, blocCountriesExist: true })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ blocCountries: { name: "Bloc countries get failed" }, blocCountriesExist: false })
      })
  }

  onTrack(evt){

  }

  render() {
    return (
      <div className="countries">
        <h1 className="App-title">Regional bloc: {this.props.match.params.name}</h1>
        {this.state.blocCountries.map((country, idx) => {
          return (
            <div className="row">
              <div className="small-3 columns">
                <div className="card">
                  <img className="flagimg" src={country.flag} ></img>
                  {/* <h3>{country.name}</h3> */}
                </div>
              </div>
              <div className="small-9 columns">
                <div className="card">
                  <p><label>Country Name:</label>{country.name}</p>
                  <p><label>Capital:</label>{country.capital}</p>
                  <p><label>Population:</label>{country.population}</p>
                  <button id={idx} className="trackbtn" onClick={this.onTrack}>Track</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Countries
