import { useForm, SubmitHandler } from "react-hook-form"
import estimateRide, { LatLng } from "../services/estimate-ride"
import { useRef, useState } from "react"
import { StandaloneSearchBox } from '@react-google-maps/api'
import useMap from "../hooks/use-map"

type Inputs = {
  idUser: number
  adressOrigin: string
  adressDestination: string
}

export const RideForm = () => {
  const { isLoaded } = useMap()
  const [addressOriginLatLng, setAddressOriginLatLng] = useState<LatLng>();
  const [addressDestinationLatLng, setAddressDestinationLatLng] = useState<LatLng>();
  const originInputRef = useRef<google.maps.places.SearchBox | null>(null);
  const destinationInputRef = useRef<google.maps.places.SearchBox | null>(null);
  const [distance, setDistance] = useState();

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const response = await estimateRide({
      origin: addressOriginLatLng as LatLng,
      destination: addressDestinationLatLng  as LatLng
    })

    setDistance(response.distance)
  }
 
  const handleOnOriginPlacesChanged = () => { 
    if(originInputRef.current){ 
      const places = originInputRef.current.getPlaces(); 
      if (places && places.length > 0) {
        setAddressOriginLatLng({
          lat: places[0].geometry?.location?.lat() || 0,
          lng: places[0].geometry?.location?.lng() || 0,
        });
      } 
    } 
  };

  const handleOnDestinationPlacesChanged = () => { 
    if(destinationInputRef.current){ 
      const places = destinationInputRef.current.getPlaces(); 
      if (places && places.length > 0) {
        setAddressDestinationLatLng({
          lat: places[0].geometry?.location?.lat() || 0,
          lng: places[0].geometry?.location?.lng() || 0,
        });
      } 
    } 
  }; 

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("idUser")} />

        {isLoaded && 
          <StandaloneSearchBox
            onLoad={(ref) => (originInputRef.current = ref)}
            onPlacesChanged={handleOnOriginPlacesChanged}
          >
            <input {...register("adressOrigin")} />
          </StandaloneSearchBox>
        }

        {isLoaded && 
          <StandaloneSearchBox
            onLoad={(ref) => (destinationInputRef.current = ref)}
            onPlacesChanged={handleOnDestinationPlacesChanged}
          >
            <input {...register("adressDestination")} />
          </StandaloneSearchBox>
        }
        
        <button className="mt-4" type="submit">Calcular distância</button>

        {distance && (
          <div>
            <span>Distancia (Km): {distance}</span>
          </div>
        )}
      </form>
    </div>
  )
}