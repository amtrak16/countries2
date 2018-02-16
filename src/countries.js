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
      blocCountries: [],
      trackedCountries: []
    }

    this.getCountries = this.getCountries.bind(this)
    this.onTrack = this.onTrack.bind(this)
    this.putNewCountry = this.putNewCountry.bind(this)
    this.getTrackedCountries = this.getTrackedCountries.bind(this)
  }

  componentDidMount() {
    this.getCountries(this.props.match.params.name)
    this.getTrackedCountries()
  }

  componentWillReceiveProps(nextProps) {
    this.getCountries(nextProps.match.params.name)
    this.getTrackedCountries()
  }

  getCountries(matchName) {
    let apiVal = `https://restcountries.eu/rest/v2/regionalbloc/${matchName}`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ blocCountries: response.data, blocCountriesExist: true })
      })
      .catch((error) => {
        this.setState({ blocCountries: { name: "Bloc countries get failed" }, blocCountriesExist: false })
      })
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

  onTrack(evt) {
    const newTrackedCountry = {
      numericCode: this.state.blocCountries[evt.target.id].numericCode,
      name: this.state.blocCountries[evt.target.id].name,
      capital: this.state.blocCountries[evt.target.id].capital,
      population: this.state.blocCountries[evt.target.id].population,
      flag: this.state.blocCountries[evt.target.id].flag
    }
    this.putNewCountry(newTrackedCountry)
  }

  putNewCountry(newTrackedCountry) {
    let apiVal = `http://5a85f13e085fdd001270430a.mockapi.io/countries2/`
    axios.post(apiVal, newTrackedCountry)
      .then((response) => {
        let curTrackedCountries = this.state.trackedCountries.slice()
        curTrackedCountries.push(newTrackedCountry)
        this.setState({ trackedCountries: curTrackedCountries })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ trackedCountries: { name: 'Failed to put tracked country.' } })
      })
  }

  render() {

    return (
      <div className="countries">
        <h1 className="App-title">Regional bloc {this.props.match.params.name} countries:</h1>
        {this.state.blocCountries.map((country, idx) => {
          return (
            <div key={idx} className="row">
              <div className="small-3 columns">
                <div className="card">
                  <img className="flagimg" src={country.flag} ></img>
                </div>
              </div>
              <div className="small-9 columns">
                <div className="card">
                  <p><label>Country Name:</label><NavLink exact to={`/country/${country.name}`} activeStyle={{ fontWeight: 'bold', color: 'red' }}>{country.name}</NavLink></p>
                  <p><label>Capital:</label>{country.capital}</p>
                  <p><label>Population:</label>{country.population}</p>
                  {this.state.trackedCountries.filter(trackedCountry => (country.numericCode === trackedCountry.numericCode)).length > 0 ?
                    <button id={idx} className="trackedbtn" onClick={this.onTrack} disabled="true">Tracked</button> :
                    <button id={idx} className="trackbtn" onClick={this.onTrack} >Track</button>}
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
