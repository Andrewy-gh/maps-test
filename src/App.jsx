import { useEffect, useState } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import locations from './data/locations';
import addresses from './data/addresses';
import LocationMarker from './components/LocationMarker';
import Directions from './components/Directions';
import './App.css';

function App() {
  const [position, setPosition] = useState({ lat: 40.7128, lng: -74.006 });
  const [locationIndex, setLocationIndex] = useState();
  const [open, setOpen] = useState(false);

  // gets location of user
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setPosition(pos);
      });
    } else {
      // handle error
      alert('geolocation not enabled');
    }
  }, []);

  const handleIndexChange = (index) => {
    setOpen(true);
    setLocationIndex(index);
  };
  const handleClose = () => {
    setOpen(false);
    setLocationIndex(undefined);
  };

  return (
    <main>
      <div className="container">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map zoom={12} center={position} mapId={import.meta.env.VITE_MAP_ID}>
            <AdvancedMarker position={position}>
              <Pin
                background={'blue'}
                borderColor={'blue'}
                glyphColor={'grey'}
              />
            </AdvancedMarker>
            {locations.map((position, index) => (
              <LocationMarker
                key={index}
                position={position}
                handleIndexChange={() => handleIndexChange(index)}
              />
            ))}
            {locationIndex !== undefined && (
              <div className={`${open ? '' : 'hidden'}`}>
                <Directions
                  start={position}
                  end={locations[locationIndex]}
                  handleClose={handleClose}
                />
              </div>
            )}
          </Map>
        </APIProvider>
      </div>
    </main>
  );
}

export default App;
