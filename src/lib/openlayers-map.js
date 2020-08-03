import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from "ol/proj";
import {
  MousePosition, ZoomSlider, defaults as defaultControls,
  ScaleLine,
} from 'ol/control';
import {createStringXY} from 'ol/coordinate';
import Overlay from "ol/Overlay";


export function createMap(ref, projection = 'EPSG:4326') {
  const map = new Map({
    target: ref.current,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
      projection,
    }),
    controls:
      defaultControls().extend([
        new ZoomSlider({
          // className: 'custom-zoom-slider',
        }),
        new ScaleLine({
          // className: 'custom-scale-line',
        })
      ])
  });
  return map;
}



export function createMousePosition(ref, projection = 'EPSG:4326') {
  return new MousePosition({
    projection,
    coordinateFormat: createStringXY(4),
    className: 'custom-mouse-position',
    target: ref.current,
    undefinedHTML: '&nbsp;',
  });
}


export function createOverlay(ref, options={}) {
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
