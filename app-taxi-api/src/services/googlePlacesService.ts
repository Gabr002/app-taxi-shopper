import axios from 'axios';

interface LatLng {
  lat: number;
  lng: number;
}

export const calculateDistance = async (origin: LatLng, destination: LatLng) => {
  try {
    const url = process.env.GOOGLE_ROUTES_API_URL;

    const response = await axios.post(url, {
      origin:{
        location: {
          latLng: {
            latitude: origin.lat,
            longitude: origin.lng,
          }
        }
      },
      destination:{
        location:{
          latLng: {
            latitude: destination.lat,
            longitude: destination.lng,
          }
        }
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false
      },
      languageCode: "en-US",
      units: "IMPERIAL"
      }, {
        headers: {
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
        }
      }
    );

    const route = response.data.routes[0];

    const distanceInKilometers = route.distanceMeters / 1000;

    return {
      distance: distanceInKilometers, // diatance in meters
      duration: route.duration // duration in seconds
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    }
  }
};
