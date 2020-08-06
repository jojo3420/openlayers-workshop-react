import React, { useEffect } from 'react';
import {Icon, Style} from "ol/style";
import icon from "resources/img/icon.png";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import {fromLonLat} from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

function MarkerLayer({ mapInstance, coordinates }) {

  useEffect(() => {
    if (mapInstance) {
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: icon,
        })
      });
      const features = coordinates.map(coordinate => {
        const iconFeature = new Feature({
          geometry: new Point(fromLonLat(coordinate)),
          name: 'Null Island',
          population: 4000,
          rainfall: 590,
        });
        iconFeature.setStyle(iconStyle);
        return iconFeature;
      })

      const vectorSource = new VectorSource({
        features: [...features]
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource
      });

      mapInstance.addLayer(vectorLayer);

    }
  }, [mapInstance, coordinates]);

  return (
    <></>
  );
}

export default MarkerLayer;
