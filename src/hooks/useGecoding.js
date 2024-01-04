import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export default function useGecoding() {
  // load geocoding google maps library
  const geocodingLibrary = useMapsLibrary('geocoding');
  const [geocodingService, setGeoCodingService] = useState(null);

  useEffect(() => {
    if (!geocodingLibrary) return;
    setGeoCodingService(new geocodingLibrary.Geocoder());
  }, [geocodingLibrary]);

  return geocodingService;
}
