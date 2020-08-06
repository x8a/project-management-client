import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import axios from 'axios'

export default class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            lat: 41.3850639,
            lng: 2.1734035,
            location: 'Hello, World!'
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.get('http://localhost:3000/api/maps?search=' + this.state.search)
        .then(response => {
            console.log(response.data)
            // volver a renderizar el mapa con CENTER = lat, lng y un PIN =  lat, lng
            this.setState({
                lat: response.data.candidates[0].geometry.location.lat,
                lng: response.data.candidates[0].geometry.location.lng,
                location: response.data.candidates[0].formatted_address
            })
        })
        .catch(e => console.log(e))
    }

    render() {

        const center = {
            lat: this.state.lat,
            lng: this.state.lng
        }

        const getMapOptions = (maps) => {
          return {
            disableDefaultUI: false,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "on" }],
              },
            ],
          };
        };
        
        const renderMarkers = (map, maps) => {
          new maps.Marker({
            position: center,
            map,
            title: this.state.location,
          });
        };            

        return (
          <div className="pl-5">
            <h1>Map</h1>
            <div className="pt-3" style={{ width: "800px", height: "500px" }}>
              <GoogleMapReact
                key={this.state.location}
                bootstrapURLKeys={{
                  key: process.env.GOOGLE_API_KEY,
                }}
                defaultCenter={center}
                defaultZoom={15}
                options={getMapOptions}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
              ></GoogleMapReact>
            </div>
            <form onSubmit={this.handleSubmit} style={{width: '300px', paddingTop: '10px'}}>
              <div className="form-group">
                <label>Search</label>
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  value={this.state.search}
                  onChange={this.handleChange}
                  placeholder="Avinguda Diagonal, 211"
                />
              </div>
              <button className='btn btn-primary'>Submit</button>
            </form>
          </div>
        );
    }
}
