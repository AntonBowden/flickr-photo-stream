import React, { Component } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import SimpleAppBar from './SimpleAppBar';
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
    if (!this.state.photos.length) {
      return (<p>Loading...</p>);
    }
    return (
      <div className="App">
        <SimpleAppBar />
        <PhotoGrid loadPhotos={this.loadPhotos} photos={this.state.photos}/>
      </div>
    );
  }
}

export default App;
