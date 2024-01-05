import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export default function useDirections() {
  const map = useMap();

  // load routes google maps library
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  // init services
  useEffect(() => {
    if (!routesLibrary || !map) return;
    // create instance and set in state
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  return { directionsService, directionsRenderer };
}
