import React, { useState } from 'react'
import api from '../../api'

export default function NewStreetArt(props) {
  const [state, setState] = useState({
    lat: '',
    lng: '',
    picture: null,
  })
  function getCurrentCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('The current coords are', position.coords)
        setState({
          ...state,
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        })
      })
    }
  }
  function handleInputChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  function handleFileChange(e) {
    console.log('The file added by the use is: ', e.target.files[0])
    setState({
      ...state,
      picture: e.target.files[0],
    })
  }
  function addStreetArtAndRedirectToDetailPage(e) {
    // To send information with "form-data" (like in Postman)
    const uploadData = new FormData()
    uploadData.append('lng', state.lng)
    uploadData.append('lat', state.lat)
    uploadData.append('picture', state.picture)

    api
      .addStreetArt(uploadData)
      .then(createdStreetArt => {
        // Redirect the user to another page
        props.history.push('/street-art-detail/' + createdStreetArt._id)
      })
      .catch(err => {
        console.log('Error while adding the street art: ', err)
      })
  }
  return (
    <div className="container NewStreetArt">
      <h1>New Street Art</h1>

      <pre>{JSON.stringify(state)}</pre>

      <button
        className="btn btn-block btn-outline-danger my-4"
        onClick={getCurrentCoordinates}
      >
        Get Current Coordinates
      </button>

      <div className="row my-4">
        <div className="col-sm-3">
          <label>Coordinates</label>
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            value={state.lng}
            onChange={handleInputChange}
            name="lng"
            placeholder="Longitude"
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            value={state.lat}
            onChange={handleInputChange}
            name="lat"
            placeholder="Latitude"
          />
        </div>
      </div>

      <div className="row my-4">
        <div className="col-sm-3">
          <label>Picture</label>
        </div>
        <div className="col">
          <input
            className="form-control"
            type="file"
            name="picture"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <button
        className="btn btn-block btn-danger my-4"
        onClick={addStreetArtAndRedirectToDetailPage}
      >
        Add Street Art
      </button>
    </div>
  )
}
