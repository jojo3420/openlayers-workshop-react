import React, {Fragment, useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import 'ol/ol.css';
import styled from 'styled-components';
import {createMap, createMousePosition, createOverlay} from "lib/openlayers-map";
import PopUp from "components/map/PopUp";
import SearchBox from "components/map/SearchBox";

const MapContainer = styled.div`
  width: '100%';
  height: 400px;
  
  border: 1px solid red;
`;



const searchBoxHTML = `
<Fragment>
<!--<div style=" -->
<!--          position: absolute;-->
<!--          background-color: white;-->
<!--          filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));-->
<!--          padding: 15px;-->
<!--          border-radius: 10px;-->
<!--          border: 1px solid #cccccc;-->
<!--          top: 130px;-->
<!--          /*left: 8px;*/-->
<!--          right: 8px;-->
<!--          min-width: 100px;-->
<!--           z-index: 10;">-->
<!--          <input name="query" value="test"/>-->
<!--          <button onclick="alert('aa')">1</button>-->
<!--          <button onclick="test1('bb')">2</button>-->
<!--</div>-->
</Fragment>

`;

function OlMap(props) {
  const [mapInstance, setMapInstance] = useState(null);
  const mapRef = useRef(null);
  const mousePositionRef = useRef(null);


  useEffect(() => {
    const map = createMap(mapRef);
    setMapInstance(map);
    const mousePosition = createMousePosition(mousePositionRef);
    map.addControl(mousePosition);

    // map.getViewport().appendChild(searchPanel);
    const viewport = map.getViewport();
    console.log({viewport})
    // ReactDOM.render(<SearchBox />, viewport);
    // debugger;
    const rootEl = document.getElementById('root');
    ReactDOM.render(<SearchBox />, rootEl.querySelector('fragment'))


    return () => {
      map.setTarget(null);
    }
  }, []);

  return (
    <>
      <MapContainer
        ref={mapRef}
        dangerouslySetInnerHTML={{__html: searchBoxHTML}}
      />
      <div ref={mousePositionRef}/>
      <PopUp mapInstance={mapInstance}/>
    </>

  );
}

export default OlMap;
