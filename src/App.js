import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import './App.css';
import Countries from './countries';
import Tracking from './tracking';
import Country from './country'
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Countries</h1>
          </header>
          <div className="row">
            <div className="small-2 columns">
              <div className="card">
                <Route path="/" component={Home} />
              </div>
            </div>
            <div className="small-10 columns">
              <Route exact path="/countries/:name" component={Countries} />
              <Route path="/tracking/" component={Tracking} />
              <Route exact path="/country/:name" component={Country} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      blocs: [
        { "name": "EU" }, { "name": "EFTA" }, { "name": "CARICOM" }, { "name": "PA" },
        { "name": "AU" }, { "name": "USAN" }, { "name": "EEU" }, { "name": "AL" },
        { "name": "ASEAN" }, { "name": "CAIS" }, { "name": "CEFTA" }, { "name": "NAFTA" },
        { "name": "SAARC" }
      ]
    }
  }

  render() {
    return (
      <div className="Home">
        <ul className="filter-nav vertical">
          <li className="filter-nav-entry vertical"><NavLink exact to="/" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Home</NavLink></li>
          <li className="filter-nav-entry vertical"><NavLink exact to="/tracking" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Tracking</NavLink></li>
          {this.state.blocs.map((bloc, idx) => {
            return (
              <li key={idx} className="filter-nav-entry vertical"><NavLink exact to={`/countries/${bloc.name}`} activeStyle={{ fontWeight: 'bold', color: 'red' }}>{bloc.name}</NavLink></li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default App;
