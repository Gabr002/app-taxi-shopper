// import React from 'react'
// import { GoogleMap } from '@react-google-maps/api'
// import useMap from '../hooks/use-map'

// const containerStyle = {
//   width: '800px',
//   height: '800px',
// }

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// }

// function Map() {
//   const { isLoaded } = useMap()

//   const onLoad = React.useCallback(function callback(map: google.maps.Map) {
//     const bounds = new window.google.maps.LatLngBounds(center)
//     map.fitBounds(bounds)
//   }, [])

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//     >
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   )
// }

// export default React.memo(Map)
