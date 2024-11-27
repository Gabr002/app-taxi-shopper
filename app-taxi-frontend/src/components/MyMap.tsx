// import React, { useEffect, useRef, useState } from 'react'
// import {
//   ControlPosition,
//   MapControl,
//   Map as GoogleMap,
//   useMap,
//   useMapsLibrary,
//   useAdvancedMarkerRef,
// } from '@vis.gl/react-google-maps';

// interface MapHandlerProps {
//   place: google.maps.places.PlaceResult | null;
//   marker: google.maps.marker.AdvancedMarkerElement | null;
// }

// const MapHandler = ({ place, marker }: MapHandlerProps) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map || !place || !marker) return;

//     if (place.geometry?.viewport) {
//       map.fitBounds(place.geometry?.viewport);
//     }
//     marker.position = place.geometry?.location;
//   }, [map, place, marker]);

//   return null;
// };

// interface PlaceAutocompleteProps {
//   onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
// }

// const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
//   const [placeAutocomplete, setPlaceAutocomplete] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const places = useMapsLibrary('places');

//   useEffect(() => {
//     if (!places || !inputRef.current) return;

//     const options = {
//       fields: ['geometry', 'name', 'formatted_address']
//     };

//     setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
//   }, [places]);

//   useEffect(() => {
//     if (!placeAutocomplete) return;

//     placeAutocomplete.addListener('place_changed', () => {
//       onPlaceSelect(placeAutocomplete.getPlace());
//     });
//   }, [onPlaceSelect, placeAutocomplete]);

//   return (
//     <div className="autocomplete-container">
//       <input ref={inputRef} />
//     </div>
//   );
// };

// function MyMap() {
//   const [selectedPlace, setSelectedPlace] =
//     useState<google.maps.places.PlaceResult | null>(null);
//   const [, marker] = useAdvancedMarkerRef();

//   return (
//     <>
//       <GoogleMap
//       defaultZoom={3}
//       defaultCenter={{ lat: 22.54992, lng: 0 }}
//       gestureHandling={'greedy'}
//       disableDefaultUI={true}
//     >
//       {/* <AdvancedMarker ref={markerRef} position={null} /> */}
//     </GoogleMap>
//     <MapControl position={ControlPosition.TOP}>
//       <div className="autocomplete-control">
//         <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
//       </div>
//     </MapControl>
//     <MapHandler place={selectedPlace} marker={marker} />
//     </>
//   )
// }

// export default React.memo(MyMap)
