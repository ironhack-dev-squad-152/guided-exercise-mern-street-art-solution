import React, { useState, useEffect, useRef } from 'react'
import api from '../../api'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'

export default function StreetArtDetail(props) {
  let streetArtId = props.match.params.streetArtId
  const [streetArt, setStreetArt] = useState(null)
  const mapDomRef = useRef(null)
  let map = useRef(null).current // A variable that is always the same, even after a new render
  let marker = useRef(null).current // A variable that is always the same, even after a new render

  useEffect(() => {
    api.getStreetArt(streetArtId).then(streetArtFromApi => {
      setStreetArt(streetArtFromApi)
      let [lng, lat] = streetArtFromApi.location.coordinates
      initMap(lng, lat)
    })
  }, [])

  function initMap(lng, lat) {
    // Embed the map where "mapDomRef" is defined in the render
    map = new mapboxgl.Map({
      container: mapDomRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10,
    })

    // Add zoom control on the top right corner
    map.addControl(new mapboxgl.NavigationControl())

    // Create a marker on the map with the coordinates ([lng, lat])
    marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .addTo(map)
  }

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
      <div ref={mapDomRef} style={{ height: 400 }}></div>
    </div>
  )
}
