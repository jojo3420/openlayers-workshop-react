import React, {useRef, useEffect, useState} from 'react';
import styles from './PopUp.module.css';
import cn from 'classnames/bind';
import styled from "styled-components";
import {toStringHDMS} from "ol/coordinate";
import {toLonLat} from "ol/proj";
import {createOverlay} from "lib/openlayers-map";

const cx = cn.bind(styles);


const PopupTitle = styled.h2`
  line-height: 1.1rem;
`;
const PopupContent = styled.p`
  line-height: 1.6rem;
  font-size: 1rem;
`;
const PopupFooter = styled.p`
  font-size: 0.75rem;
`;

function PopUp({ mapInstance, title, body, footer }) {
  const popUpRef = useRef(null);
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');


  // console.log({ mapInstance });
  useEffect(() => {
    if (mapInstance) {
      const popupOverlay = createOverlay(popUpRef);
      mapInstance.addOverlay(popupOverlay);

      mapInstance.on('singleclick', function (evt) {
        const coordinate = evt.coordinate;
        console.log({coordinate});
        popUpRef.current.style = 'display: show;';

        const hdms = toStringHDMS(toLonLat(coordinate));
        console.log({ hdms })
        setContent1(title || 'title');
        setContent2(body || 'body');
        setContent3(footer || 'footer');
        popupOverlay.setPosition(coordinate);
      });
    }

  }, [
    mapInstance, popUpRef, setContent1, setContent2, setContent3,
    createOverlay, toStringHDMS

  ]);


  const onClose = () => {
    popUpRef.current.style = 'display: none;';
  }

  return (
    <div
      className={cx('ol-popup')}
      ref={popUpRef}
    >
      <a className={cx('ol-popup-closer')}
         onClick={onClose}
      />
      <PopupTitle>
        {content1}
      </PopupTitle>
      <PopupContent>
        {content2}
      </PopupContent>
      <PopupFooter>
        {content3}
      </PopupFooter>
    </div>
  );
}

export default PopUp;
