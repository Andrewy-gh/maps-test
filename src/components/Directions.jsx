import { useEffect, useState } from 'react';
import useDirections from '../hooks/useDirections';

export default function Directions({ start, end }) {
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const { directionsService, directionsRenderer } = useDirections();
  const [open, setOpen] = useState(true);

  const clearDirections = () => {
    directionsRenderer.setMap(null);
    setOpen(false);
  };

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

  return (
    <div className={`${open ? '' : 'hidden'} directions`}>
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
    </div>
  );
}
