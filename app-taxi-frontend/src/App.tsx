import { RideForm } from './components/RideForm'

import './App.css'
import Map from './components/Map'

function App() {
  return (
    <div className='flex gap-5'>
      <RideForm />
      <Map />
    </div>
  )
}

export default App
