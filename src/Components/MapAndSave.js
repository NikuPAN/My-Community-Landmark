import React from 'react';
import Map from './MapContainer';
// import SaveShortNote from './SaveShortNote';

const MapAndSave = () => {
  return (
    <div className="container">
      <div className="left">
        <Map />
      </div>
      <div className="right">
        {/* <SaveShortNote /> */}
      </div>
    </div>
  )
}

export default MapAndSave;
