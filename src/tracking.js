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

class Tracking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trackedCountries: []
    }

    this.onTracked = this.onTracked.bind(this)
    this.getTrackedCountries = this.getTrackedCountries.bind(this)
  }

  componentDidMount() {
    this.getTrackedCountries()
  }

  getTrackedCountries() {
    let apiVal = `http://5a85f13e085fdd001270430a.mockapi.io/countries2/`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ trackedCountries: response.data })
      })
      .catch((error) => {
        this.setState({ trackedCountries: { name: "Tracked countries get failed" } })
      })
  }

  onTracked(evt) {
    const unTrackCountry = {
      id: this.state.trackedCountries[evt.target.id].id,
    }
    this.deleteCountry(unTrackCountry)
  }

  deleteCountry(unTrackCountry) {
    let apiVal = `http://5a85f13e085fdd001270430a.mockapi.io/countries2/${unTrackCountry.id}`
    axios.delete(apiVal, unTrackCountry)
      .then((response) => {
        this.getTrackedCountries()
      })
      .catch((error) => {
        console.log(error)
        this.setState({ trackedCountries: { name: 'Failed to delete tracked country.' } })
      })
  }

  render() {

    return (
      <div className="countries">
        <h1 className="App-title">Tracked Countries:</h1>
        {this.state.trackedCountries.map((country, idx) => {
          return (
            <div key={idx} className="row">
              <div className="small-3 columns">
                <div className="card">
                  <img className="flagimg" src={country.flag} ></img>
                </div>
              </div>
              <div className="small-9 columns">
                <div className="card">
                  <p><label>Country Name:</label><NavLink exact to={`/country/${country.id}`} activeStyle={{ fontWeight: 'bold', color: 'red' }}>{country.name}</NavLink></p>
                  <p><label>Capital:</label>{country.capital}</p>
                  <p><label>Population:</label>{country.population}</p>
                    <button id={idx} className="trackedbtn2" onClick={this.onTracked} >Tracked</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}

export default Tracking
