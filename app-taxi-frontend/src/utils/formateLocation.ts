export default function formatLocation(location: google.maps.places.PlaceResult) {
    return `${location?.formatted_address || ''} - ${location?.vicinity || ''}`
}