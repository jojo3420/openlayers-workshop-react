import React, {useEffect} from 'react';
import {View} from "ol";
import {fromLonLat} from "ol/proj";


function OlView({ mapInstance, projection = 'EPSG:4326' }) {

  useEffect(() => {
    if (mapInstance) {
      /*
        OSM 기본 projection
        projection_: EPSG3857Projection
        axisOrientation_: "enu"
        canWrapX_: true
        code_: "EPSG:3857"
        defaultTileGrid_: null
        extent_: (4) [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
        getPointResolutionFunc_: ƒ (resolution, point)
        global_: true
        metersPerUnit_: undefined
        units_: "m"
        * */
      const view = new View({
        // minZoom,
        // maxZoom,
        center: fromLonLat([126.9776, 37.56664]),
        zoom: 15,
        // projection,
      });
      console.log({ view })
      // console.log({ center: fromLonLat([126.9776, 37.56664])})

      mapInstance.setView(view);
    }



  }, [mapInstance, projection]);
  return (
    <></>
  );
}

export default OlView;
