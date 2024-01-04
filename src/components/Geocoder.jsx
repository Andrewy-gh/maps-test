import { useEffect, useState } from 'react';
import useGecoding from '../hooks/useGecoding';

export default function Geocoder({ position }) {
  const [result, setResult] = useState(null);
  const geocodingService = useGecoding();

  useEffect(() => {
    if (!geocodingService) return;
    // location is only valid for latlngliterals
    geocodingService.geocode({ location: position }, (results, status) => {
      if (status === 'OK') {
        setResult(results[0].formatted_address);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }, [geocodingService]);

  return result;
}
