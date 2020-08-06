import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import ImageLayer from 'ol/layer/Image';
import ImageArcGISRest from "ol/source/ImageArcGISRest";
import LayerGroup from 'ol/layer/Group';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import {fromLonLat, toLonLat} from "ol/proj";
import {
  MousePosition, ZoomSlider, defaults as defaultControls,
  ScaleLine,
} from 'ol/control';
import {createStringXY} from 'ol/coordinate';
import Overlay from "ol/Overlay";
import LayerSwitcher from 'ol-layerswitcher';


const center = [126.9776, 37.56664];





export function createOverlay(ref, options = {}) {
  const overlay = new Overlay({
    element: ref.current,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
    ...options
  });
  return overlay;
}

