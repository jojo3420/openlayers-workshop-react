import React, {useRef, useEffect} from 'react';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';
import styled, { css } from 'styled-components';

// ${(props) =>
//    props.cyan &&
//    css`
//      background: ${palette.cyan[5]};
// &:hover {
//   background: ${palette.cyan[4]};
// }
// `}

const MapContainer = styled.div`
  width: '100%';
  height: 400px;
`;

function OpenlayersMap(props) {
  const ref = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: ref.current,
      layers: [
        new TileLayer({
          source: new XYZSource({
            url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
          })
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });
    return () => {
      map.setTarget(null);
    }

  }, []);

  return (

      <MapContainer
        ref={ref}
      >
      </MapContainer>
  );
}

export default OpenlayersMap;
