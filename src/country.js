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

class Country extends Component {
  constructor(props) {
    super(props)

    this.state = {
      country: []
    }

    this.getCountry = this.getCountry.bind(this)
    this.getTrackedCountry = this.getTrackedCountry.bind(this)
  }

  componentDidMount() {
    // this.getCountry(this.props.match.params.name)
    const rtvCountry = {
      id: this.props.match.params.id
    }
    this.getTrackedCountry(rtvCountry)
  }

  componentWillReceiveProps(nextProps) {
    // this.getCountry(nextProps.match.params.name)
    this.getTrackedCountry(this.props.match.params.id)
  }

  getCountry(matchName) {
    let apiVal = `https://restCountry.eu/rest/v2/regionalbloc/${matchName}`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ country: response.data, blocCountryExist: true })
      })
      .catch((error) => {
        this.setState({ country: { name: "Bloc Country get failed" }, blocCountryExist: false })
      })
  }

  getTrackedCountry(matchId) {
    let apiVal = `http://5a85f13e085fdd001270430a.mockapi.io/countries2/${matchId.id}`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ country: response.data })
      })
      .catch((error) => {
        this.setState({ country: { name: "Tracked Country get failed" } })
      })
  }

  render() {

    return (
      <div className="Country">
        <h1 className="App-title">Country</h1>
        {this.state.country.map((country, idx) => {
          return (
            <div key={idx} className="row">
              <div className="small-3 columns">
                <div className="card">
                  <img className="flagimg" src={country.flag} ></img>
                </div>
              </div>
              <div className="small-9 columns">
                <div className="card">
                  <p><label>Country Name:</label>{country.name}</p>
                  <p><label>Capital:</label>{country.capital}</p>
                  <p><label>Population:</label>{country.population}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Country
