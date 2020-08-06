import React, { useEffect } from 'react';
import ZoomSlider from "ol/control/ZoomSlider";

function ZoomSliderWrapper({ mapInstance, options }) {

  useEffect(() => {
    if (mapInstance) {
      const zoomSlider =new ZoomSlider({
         // className: 'custom-zoom-slider',
      });
      mapInstance.addControl(zoomSlider);
    }
  }, [mapInstance, options]);

  return (
    <></>
  );
}

export default ZoomSliderWrapper;
