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


export function createMap(ref, projection = 'EPSG:4326') {


  //  base layer 는 type 프로퍼티의 'base' 값 필수!
  const osmLayer = new TileLayer({
    title: 'OSM',
    type: 'base',
    visible: true, // visible 속성으로 기본 렌더링 레이어를 선택
    source: new OSM(),
  });
  const waterColorLayer = new TileLayer({
    title: 'Water color',
    type: 'base',
    visible: false, // OSM 이 기본이 되려면 다른 레이어 의 visible 속섣 지정 해야 함
    source: new Stamen({
      layer: 'watercolor',
    }),
  });
// 2개의 layer 로 구성된  레이어 그룹
// 레이어 그룹도 1개의 레이어 처럼 작동함. 단지 레이어가 2개로 구성되어 있음!
  const waterColorLayerGroup = new LayerGroup({
    title: 'Water color with labels',
    type: 'base',
    combine: true,
    visible: false, // OSM 이 기본이 되려면 다른 레이어 의 visible 속섣 지정 해야 함
    layers: [
      // map layer
      new TileLayer({
        source: new Stamen({
          layer: 'watercolor',
        }),
      }),
      // label layer
      new TileLayer({
        source: new Stamen({
          layer: 'terrain-labels',
        }),
      }),
    ],
  });

  const baseLayerGroup = new LayerGroup({
    title: 'Base Map',
    // layerGroup 도 레이어로 추가 가능!
    layers: [osmLayer, waterColorLayer, waterColorLayerGroup],
  });


// type: 이 base 속성이 빠지면 옵션 레이어가 되며
// 여러개 선택 또는 1개 선택 가능 하도록 체크 박스로 표현됨!
  const overlayGroup = new LayerGroup({
    title: 'Overlays',
    layers: [
      new ImageLayer({
        title: 'Countries',
        visible: false,
        source: new ImageArcGISRest({
          ratio: 1,
          params: {LAYERS: 'show:0'},
          // 요청후 응답까지 몇초 걸림..
          url:
            'https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer',
        }),
      }),
      // Create Label
      new TileLayer({
        title: 'terrain-labels1',
        visible: true,
        source: new Stamen({
          layer: 'terrain-labels',
        }),
      }),
    ],
  });


  const map = new Map({
    target: ref.current,
    layers: [
      baseLayerGroup,
      overlayGroup,
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
  const layerSwitcher = new LayerSwitcher();
  map.addControl(layerSwitcher);
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
