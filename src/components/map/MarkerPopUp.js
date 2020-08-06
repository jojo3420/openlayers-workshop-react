import React, {useRef, useState, useEffect, useCallback} from 'react';
import Overlay from "ol/Overlay";
import styled from "styled-components";



function MarkerPopUp({ mapInstance }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const markerPopUpRef = useRef();

  useEffect(() => {
    if (mapInstance) {
      const popupOverlay = new Overlay({
        element: markerPopUpRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50],
      });
      mapInstance.addOverlay(popupOverlay);

      // single click or double click event. show popup element
      mapInstance.on('click', e => {
        const { pixel } = e;
        const clickFeature = mapInstance.forEachFeatureAtPixel(pixel, feature => feature);
        console.log({clickFeature});
        if (clickFeature) {
          const coordinates = clickFeature.getGeometry().getCoordinates();
          popupOverlay.setPosition(coordinates);
          setTitle('Marker Info');
          setBody(clickFeature.get('name'));
          markerPopUpRef.current.style = 'display: block;';
        } else {
          markerPopUpRef.current.style = 'display: none;';
        }
      });
    }
  }, [markerPopUpRef, mapInstance]);


  const handleClose = useCallback(() => {
    markerPopUpRef.current.style = 'display: none;';

  }, [markerPopUpRef]);


  return (
    <MarkerPopUpBlock
      ref={markerPopUpRef}
      onClick={handleClose}
    >
      <CloseButton onClick={handleClose} />
      <Title>{title}</Title>
      <Body>{body}</Body>
    </MarkerPopUpBlock>
  );
}


const MarkerPopUpBlock = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  min-width: 13rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  bottom: 12px;
  left: -50px;
  &:before , &:after {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  &:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  
 `;

const Title = styled.h3`
    color: green;
    font-size: 1rem;
    font-align: center;
`;

const Body = styled.p`
    color: gray;
    font-size: 1.3rem;
    font-align: 1rem;
`;

const CloseButton = styled.a`
  text-decoration: none;
  position: absolute;
  top: 3px;
  right: 8px;
  &:after {
    content: "❌";
  }
`;


export default MarkerPopUp;
