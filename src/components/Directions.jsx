import { useEffect, useState } from 'react';
import useDirections from '../hooks/useDirections';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';

export default function Directions({ start, end, handleClose }) {
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const { directionsService, directionsRenderer } = useDirections();

  // find a route using the directionsService
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    directionsService
      .route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsService, directionsRenderer, start, end]);

  // route index changes, rerender directions
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  const clearDirections = () => {
    directionsRenderer.setMap(null);
    handleClose();
  };

  const startUrlString = [start.lat, start.lng].join('%2C');
  const endUrlString = [end.lat, end.lng].join('%2C');

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg?.distance?.text}</p>
      <p>Duration: {leg?.duration?.text}</p>

      <h2>Other routes available</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearDirections}>Clear Directions</button>
      <div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${startUrlString}&destination=${endUrlString}&travelmode=driving`}
          target="_blank"
          rel="noreferrer"
        >
          View Directions on Google Maps
        </a>
      </div>
    </div>
  );
}
