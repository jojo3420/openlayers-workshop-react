import React, { useEffect } from 'react';
import {ScaleLine} from "ol/control";

function ScaleLineWrapper({ mapInstance, options }) {

  useEffect(() => {
    if (mapInstance) {
      const scaleLine = new ScaleLine({
        // className: 'custom-scale-line',
        ...options,
      })
      mapInstance.addControl(scaleLine);


    }
  }, [mapInstance, options]);

  return (
    <></>
  );
}

export default ScaleLineWrapper;
