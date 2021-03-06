import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import api from '../../api'

export default function Map() {
  const mapDomRef = useRef(null)
  let map = useRef(null).current
  let markers = useRef(null).current

  useEffect(() => {
    initMap(15, 45)
  }, [])

  useEffect(() => {
    api.getStreetArts().then(streetArts => {
      markers = []
      for (let i = 0; i < streetArts.length; i++) {
        markers.push = new mapboxgl.Marker({ color: 'red' })
          .setLngLat(streetArts[i].location.coordinates)
          .addTo(map)
      }
    })
  }, [])

  function initMap(lng, lat) {
    // Embed the map where "mapDomRef" is defined in the render
    map = new mapboxgl.Map({
      container: mapDomRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 3,
    })

    // Add zoom control on the top right corner
    map.addControl(new mapboxgl.NavigationControl())
  }

  return (
    <div>
      <div ref={mapDomRef} style={{ height: 400 }}></div>
    </div>
  )
}
