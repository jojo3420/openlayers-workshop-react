import React, { useEffect, useRef } from 'react';
import {createStringXY} from "ol/coordinate";
import {MousePosition} from 'ol/control';
import styled from "styled-components";


function MousePositionCustom({ mapInstance, projection }) {
  const mouseRef = useRef(null);


  useEffect(() => {
    if (mapInstance) {
      const mousePosition = new MousePosition({
        projection, // 외부에 보이는 projection 만 EPSG:4326으로 설정됨!
        coordinateFormat: createStringXY(4),
        className: 'custom-mouse-position',
        target: mouseRef.current,
        undefinedHTML: '&nbsp;',
      });

      mapInstance.addControl(mousePosition);
    }

  }, [mouseRef, mapInstance, projection]);

  return (
    <MousePositionBlock ref={mouseRef} />
  );
}

const MousePositionBlock = styled.div`
  padding: 0.5rem auto;
  margin: 0.5rem auto;
  border: 2px solid gray;
  text-align: center;
`;

export default MousePositionCustom;
