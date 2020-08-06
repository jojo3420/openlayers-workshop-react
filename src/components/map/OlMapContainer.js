import React, {Fragment, useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import './OlMap.css';
import SearchBox from "components/map/SearchBox";
import MarkerPopUp from "components/map/MarkerPopUp";
import MarkerLayer from "components/map/MarkerLayer";
import Layers from "components/map/Layers";
import OlView from "components/map/OlView";
import MousePositionCustom from "components/map/MousePositionCustom";
import LayerSwitcherWrapper from "components/map/LayerSwitcherWrapper";
import {Map} from "ol";
// import {defaults as defaultControls, ScaleLine, ZoomSlider} from "ol/control";
import ScaleLineWrapper from "components/map/ScaleLineWrapper";
import ZoomSliderWrapper from "components/map/ZoomSliderWrapper";



const MapContainer = styled.div`
  width: '100%';
  height: 400px;
  border: 3px solid blue;
`;


const getInnerHTML = () => {
  /**
   dangerouslySetInnerHTML
   dangerouslySetInnerHTML은 브라우저 DOM에서 innerHTML을 사용하기 위한 React의 대체 방법입니다.
   일반적으로 코드에서 HTML을 설정하는 것은 사이트 간 스크립팅 공격에 쉽게 노출될 수 있기 때문에 위험합니다.
   따라서 React에서 직접 HTML을 설정할 수는 있지만, 위험하다는 것을 상기시키기 위해
   dangerouslySetInnerHTML을 작성하고 __html 키로 객체를 전달 해야 합니다. 아래는 예시입니다.
   */
  return {__html: '<Fragment id="search-box-target"/>'};
};

function OlMapContainer({}) {
  const [mapInstance, setMapInstance] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // 맵 인스턴스 생성
    const map = new Map({
      target: mapRef.current,
      // controls:
      //   defaultControls().extend([
      //     new ZoomSlider({
      //       // className: 'custom-zoom-slider',
      //     }),
      //   ]),
    });
    setMapInstance(map);


    // SearchBox 붙이기
    const fragmentEl = document.getElementById('root').querySelector('fragment#search-box-target')
    ReactDOM.render(<SearchBox />, fragmentEl);

    // clean up
    return () => {
      map.setTarget(null);
    }
  }, [mapRef]);


  return (
    <>
      <MapContainer
        ref={mapRef}
        dangerouslySetInnerHTML={getInnerHTML()}
      />
      <Layers mapInstance={mapInstance} data={[]} />
      <OlView mapInstance={mapInstance} projecton={null} />
      <MarkerLayer
        mapInstance={mapInstance}
        coordinates={[[126.9776, 37.56664], [126.9895, 37.5662]]}
      />
      <MarkerPopUp mapInstance={mapInstance}/>
      <ZoomSliderWrapper
        mapInstance={mapInstance}
        options={{}}
      />
      <MousePositionCustom
        mapInstance={mapInstance}
        projection="EPSG:4326"
      />
      <ScaleLineWrapper
        mapInstance={mapInstance}
        options={{}}
      />
      <LayerSwitcherWrapper
        mapInstance={mapInstance}
      />
    </>

  );
}

export default OlMapContainer;
