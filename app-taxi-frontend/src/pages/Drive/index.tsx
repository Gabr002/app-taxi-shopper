import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer, StandaloneSearchBox } from '@react-google-maps/api'
import React, { useRef, useState, useEffect } from 'react'
import { CircleDot, CircleUser, Flag } from 'lucide-react'
import estimateRide from '../../services/estimate-ride'
import { LatLng } from 'use-places-autocomplete'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal'
import ListDrivers from './components/ListDrivers'
import Overlay from '../../components/Overlay'
import CPFInput from '../../components/CPFInput'

const KEY: string = import.meta.env.VITE_GOOGLE_API_KEY

export const Drive: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: KEY,
    libraries: ['places'],
  })
  const [, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [distanceMarker, setDistanceMarker] = useState('')
  const [, setDurationMarker] = useState('')
  const [addressOriginLatLng, setAddressOriginLatLng] = useState<LatLng>();
  const [addressDestinationLatLng, setAddressDestinationLatLng] = useState<LatLng>();
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null)
  const [isOpenSelectDriver, setIsOpenSelectDriver] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [drivers, setDrivers] = useState<[]>([])
  const [driverRouteText,setDriverRouteText] = useState<{origin:string,destination:string}>({
    origin: '',
    destination: ''
  })
  const originRef = useRef()
  const destinationRef = useRef()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const location = { lat: latitude, lng: longitude }
        setCurrentLocation(location)
        setAddressOriginLatLng(location)
      },
      (error) => toast.error('Erro ao obter a localização'),
      { enableHighAccuracy: true }
    )
  }, [])

  useEffect(() => {
    const inputOrigin = document.getElementById('origin') as HTMLInputElement
    const inputDestination = document.getElementById('destination') as HTMLInputElement

    if (inputOrigin && inputDestination) {
      setDriverRouteText({
        origin: inputOrigin.value,
        destination: inputDestination.value
      })
    }
  }, [isOpenSelectDriver])

  if (!isLoaded || !currentLocation) {
    return <div className="animate-pulse">Loading...</div>
  }

  async function calculateRoute() {
    if (!addressOriginLatLng || !addressDestinationLatLng) return
    setIsLoading(true);
    const response = await estimateRide({
      origin: addressOriginLatLng as LatLng,
      destination: addressDestinationLatLng as LatLng
    })

    if(response.options){
      setDrivers(response.options)
      setIsOpenSelectDriver(true);
    }

    const directionsService = new google.maps.DirectionsService()
    try {
      const res = await directionsService.route({
        origin: addressOriginLatLng,
        destination: addressDestinationLatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(res)
        setDistanceMarker(res.routes[0].legs[0].distance.text)
        setDurationMarker(res.routes[0].legs[0].duration.text)
    } catch (error) {
      toast.error(error)
        setIsLoading(false); 
    }
      const distanceInKilometers = response.distance / 1000;
      const distanceFormatted = `${distanceInKilometers.toFixed(2)} km`;
    setDistance(distanceFormatted)
    setDuration(response.duration)
  }

  const handleOnOriginPlacesChanged = () => {
    if (originRef.current) {
      const places = originRef.current.getPlaces();
      if (places && places.length > 0) {
        setAddressOriginLatLng({
          lat: places[0].geometry?.location?.lat() || 0,
          lng: places[0].geometry?.location?.lng() || 0,
        });
      }
    }
  };

  const handleOnDestinationPlacesChanged = () => {
    if (destinationRef.current) {
      const places = destinationRef.current.getPlaces();
      if (places && places.length > 0) {
        setAddressDestinationLatLng({
          lat: places[0].geometry?.location?.lat() || 0,
          lng: places[0].geometry?.location?.lng() || 0,
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Overlay isLoading={isLoading} message="Calculando rota..." />
      <Modal isVisible={isOpenSelectDriver} onClose={() => setIsOpenSelectDriver(null)}>
          <h1 className="text-2xl font-bold mb-4 w-full text-center">Sua viagem de <span className="text-green-600">{driverRouteText?.origin}</span> para <span className="text-green-600">{driverRouteText?.destination}</span> de <span className="text-green-600">{distanceMarker}</span> vai levar <span className="text-green-600">{duration}</span></h1>
          <ListDrivers
            drivers={drivers}
            onConfirmRide={() => {
              setIsOpenSelectDriver(false);
              setIsLoading(false);
            }}
            rideData={{
              origin: driverRouteText?.origin,
              destination: driverRouteText?.destination,
              distance: distanceMarker,
              estimatedTime: duration,
            }}
          />
      </Modal>
      <div className="relative flex flex-col items-center h-screen w-[100vw]">
        <div className="absolute inset-0">
          <GoogleMap
            center={currentLocation}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            {currentLocation && <Marker position={currentLocation} />}
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </div>
        <div className="absolute left-0 p-6 rounded-xl m-4 bg-white shadow-lg min-w-[24rem] z-20 border border-gray-200">
        <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Calcular rota</h2>
        <p className="text-sm text-gray-500">Insira os pontos de origem e destino para calcular a rota.</p>
      </div>

      <div className='flex flex-col gap-4 mb-6'>
        <div className="relative">
          <CPFInput />
          <CircleUser className='absolute top-3 right-3 text-gray-400 bg-white' />
        </div>
        <div className="relative">
          <StandaloneSearchBox
            onLoad={(ref) => (originRef.current = ref)}
            onPlacesChanged={handleOnOriginPlacesChanged}
          >
            <input
              id='origin'
              type="text"
              placeholder="Local de saída"
              ref={originRef}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />          
          </StandaloneSearchBox>
          <CircleDot size={20} className='absolute top-3 right-3 text-gray-400 bg-white'/>
        </div>
        <span className='absolute -right-6 top-14 z-10 bg-white -translate-y-1/2 w-9 h-[1px] border border-gray-300 transform rotate-90'/>
        <div className="relative">
          <StandaloneSearchBox
            onLoad={(ref) => (destinationRef.current = ref)}
            onPlacesChanged={handleOnDestinationPlacesChanged}
          >
            <input
              id='destination'
              type="text"
              placeholder="Local de chegada"
              ref={destinationRef}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />          
          </StandaloneSearchBox>
          <Flag size={20} className='absolute top-3 right-3 text-green-500 bg-white'/>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={calculateRoute}
        >
          Ver preços
        </button>
      </div>

  {/* <div className="flex items-center justify-between mt-4">
    <div>
      <p className="text-sm font-medium text-gray-600">Distância: <span className="font-semibold">{distance}</span></p>
      <p className="text-sm font-medium text-gray-600">Duração: <span className="font-semibold">{duration}</span></p>
    </div>
  </div> */}
</div>
    </div>
    </React.Fragment>
  )
}

