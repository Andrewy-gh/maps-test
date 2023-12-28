import { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import locations from './data/locations';
import LocationMarker from './components/LocationMarker';
import Directions from './components/Directions';
import './App.css';
function App() {
  const position = { lat: 40.7128, lng: -74.006 };
  const [locationIndex, setLocationIndex] = useState();
  const handleIndexChange = (index) => setLocationIndex(index);
  return (
    <main>
      <div className="container">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map zoom={12} center={position} mapId={import.meta.env.VITE_MAP_ID}>
            {locations.map((position, index) => (
              <LocationMarker
                key={index}
                position={position}
                handleIndexChange={() => handleIndexChange(index)}
              />
            ))}
            <Directions start={position} end={locations[locationIndex]} />
          </Map>
        </APIProvider>
      </div>
    </main>
  );
}

export default App;
