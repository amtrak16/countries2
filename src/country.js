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
  }

  componentDidMount() {
    this.getCountry(this.props.match.params.name)
  }

  getCountry(matchName) {
    let apiVal = `https://restcountries.eu/rest/v2/name/${matchName}`
    axios.get(apiVal)
      .then((response) => {
        this.setState({ country: response.data, blocCountryExist: true })
      })
      .catch((error) => {
        this.setState({ country: { name: "Bloc Country get failed" }, blocCountryExist: false })
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
                  {country.currencies.map((currency, idx) => {
                    if (idx === 0) {
                      return (
                        <div>
                          <p><label>Currencies:</label>Name: {currency.name}</p>
                          <p>Symbol: {currency.symbol}</p>
                        </div>)
                    }
                    else {
                      return (
                        <div>
                          <p>Name: {currency.name}</p>
                          <p>Symbol: {currency.symbol}</p>
                        </div>)
                    }
                  })}
                  {country.languages.map((language, idx) => {
                    // return (
                    if (idx === 0) {
                      return (<p><label>Languages:</label>{language.name}</p>)
                    }
                    else {
                      return (<p>{language.name}</p>)
                    }
                  })}
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
