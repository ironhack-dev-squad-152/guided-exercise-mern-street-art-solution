import React, { useState } from 'react'
import api from '../../api'

export default function StreetArtDetail(props) {
  let streetArtId = props.match.params.streetArtId
  const [streetArt, setStreetArt] = useState(null)

  api.getStreetArt(streetArtId).then(streetArtFromApi => {
    setStreetArt(streetArtFromApi)
  })

  function handleImgClick(e) {
    e.target.requestFullscreen() // e.target => DOM element
  }

  if (!streetArt) return <div>Loading...</div>
  return (
    <div>
      <h1>Street Art Detail</h1>
      <img src={streetArt.pictureUrl} alt="" onClick={handleImgClick} />
      <hr />
      Longitude: {streetArt.location.coordinates[0]} <br />
      Latitude: {streetArt.location.coordinates[1]} <br />
    </div>
  )
}
