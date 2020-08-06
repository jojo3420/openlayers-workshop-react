import React, {useEffect} from 'react';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Stamen from "ol/source/Stamen";
import LayerGroup from "ol/layer/Group";
import ImageLayer from "ol/layer/Image";
import ImageArcGISRest from "ol/source/ImageArcGISRest";

function Layers({mapInstance, data}) {

  useEffect(() => {
    if (mapInstance) {
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
      mapInstance.addLayer(baseLayerGroup);

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
      mapInstance.addLayer(overlayGroup);

    }
  }, [
    mapInstance, data
  ]);

  return (
    <></>
  );
}

export default Layers;
