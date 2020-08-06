import React, { useEffect } from 'react';
import LayerSwitcher from "ol-layerswitcher";

function LayerSwitcherWrapper({ mapInstance }) {
  useEffect(() => {
    if (mapInstance) {
      // https://github.com/walkermatt/ol-layerswitcher
      const layerSwitcher = new LayerSwitcher({
        activationMode: 'click',
        collapseLabel: 'x',
        label: '', // default ''
        tipLabel: 'layer open', // String the button tooltip.
        // groupSelectStyle: ''
        reverse: false // default true
      });

      mapInstance.addControl(layerSwitcher);
    }
  }, [mapInstance]);

  return (
    <></>
  );
}

export default LayerSwitcherWrapper;
