import { useState } from 'react';
import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

export default function LocationMarker({ position, handleIndexChange }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(false);
    handleIndexChange();
  };
  return (
    <>
      <AdvancedMarker position={position} onClick={() => setOpen(true)}>
        <Pin />
      </AdvancedMarker>
      {open && (
        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
          <p>I&apos;m in New York</p>
          <p>latitude: {position.lat}</p>
          <p>longitude: {position.lng}</p>
          <button onClick={handleClick}>Choose me?</button>
        </InfoWindow>
      )}
    </>
  );
}
