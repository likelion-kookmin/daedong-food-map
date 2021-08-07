import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_MAP } from '../../reducers/map';
import 'styles/map.css';

const { kakao } = window;

const KakaoMap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const container = document.getElementById('mapOverlay');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    dispatch({
      type: SET_MAP,
      map: map,
    });
  }, [dispatch]);

  return <div id="mapOverlay"></div>;
};

export default KakaoMap;
