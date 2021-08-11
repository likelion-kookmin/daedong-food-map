import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_GEO_SUCCESS } from 'reducers/map';
const { kakao } = window;

const useGeolocation = () => {
  const dispatch = useDispatch();
  const { map } = useSelector((state) => state.map);
  const [location, setLocation] = useState([37.51260163813798, 127.05525734428048]);
  const kakaoMap = map;

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
      return;
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1,
    };

    const success = (position) =>
      setLocation([position.coords.latitude, position.coords.longitude]);
    const error = () => {};
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [kakaoMap, location]);

  const getGeo = () => {
    if (kakaoMap !== null) {
      const nowPosition = new kakao.maps.LatLng(location[0], location[1]);
      kakaoMap.panTo(nowPosition);

      dispatch({
        type: SET_GEO_SUCCESS,
      });
    }
  };
  return { getGeo };
};

export default useGeolocation;
