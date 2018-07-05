import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import PhotoGrid from './PhotoGrid';

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
        <PhotoGrid loadPhotos={this.loadPhotos} photos={this.state.photos}/>
      </div>
    );
  }
}

export default App;
