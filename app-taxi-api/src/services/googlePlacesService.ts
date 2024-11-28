import axios from "axios";

interface LatLng {
  lat: number;
  lng: number;
}

export const calculateDistance = async (origin: LatLng, destination: LatLng) => {
  try {
    const url = process.env.GOOGLE_ROUTES_API_URL;

    const response = await axios.post(
      url,
      {
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.lat,
              longitude: destination.lng,
            },
          },
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false,
        },
        languageCode: "en-US",
        units: "IMPERIAL",
      },
      {
        headers: {
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
      }
    );

    if (!response.data.routes || response.data.routes.length === 0) {
      return {
        status: false,
        message: "Nenhuma rota válida encontrada entre a origem e o destino fornecidos.",
      };
    }

    const route = response.data.routes[0];


    const durationString = route.duration;
    const durationInSeconds = parseInt(durationString.replace("s", ""), 10);

    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);

    let durationFormatted = `${hours}h ${minutes}m`;
    if(!hours){
      durationFormatted = `${minutes}m`;
    }
    const distanceInKilometers = route.distanceMeters / 1000;
    const distanceFormatted = `${distanceInKilometers.toFixed(2)} km`;

    return {
      status: true,
      origin: {
          latitude: origin.lat,
          longitude: origin.lng,
      },
      destination: {
          latitude: destination.lat,
          longitude: destination.lng,
      },
      distance: route.distanceMeters,
      distanceText:distanceFormatted,
      duration: durationFormatted,
      routeResponse: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
    return { error: "An error occurred while calculating the route." };
  }
};
