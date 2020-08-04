import React, {Fragment, useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import {createMap, createMousePosition, createOverlay} from "lib/openlayers-map";
import PopUp from "components/map/PopUp";
import SearchBox from "components/map/SearchBox";

const MapContainer = styled.div`
  width: '100%';
  height: 400px;
  
  border: 1px solid red;
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

function OlMap({ }) {
  const [mapInstance, setMapInstance] = useState(null);
  const mapRef = useRef(null);
  const mousePositionRef = useRef(null);

  useEffect(() => {
    const map = createMap(mapRef);
    setMapInstance(map);
    const mousePosition = createMousePosition(mousePositionRef);
    map.addControl(mousePosition);
    ReactDOM.render(<SearchBox />, document.getElementById('root').querySelector('fragment#search-box-target'));
    return () => {
      map.setTarget(null);
    }
  }, []);

  return (
    <>
      <MapContainer
        ref={mapRef}
        dangerouslySetInnerHTML={getInnerHTML()}
      />
      <div ref={mousePositionRef}/>
      <PopUp mapInstance={mapInstance}/>
    </>

  );
}

export default OlMap;
