import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchJsonp from 'fetch-jsonp';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: []
    }
    this.loadPhotos = this.loadPhotos.bind(this);
  }

  loadPhotos() {
    fetchJsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json", {
      jsonpCallbackFunction: "jsonFlickrFeed"
    })
    .then(response => response.json())
    .then(data => this.setState((prevState) => ({ photos: prevState.photos.concat(data.items) })))
    .catch(err => console.error(err))
  }

  componentDidMount() {
    this.loadPhotos();
  }

  render() {
    console.log(this.state.photos);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
