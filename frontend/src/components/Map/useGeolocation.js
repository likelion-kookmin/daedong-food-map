import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_GEO } from 'reducers/map';
const { kakao } = window;

const useGeolocation = () => {
  const dispatch = useDispatch();
  const { map } = useSelector((state) => state.map);
  const [location, setLocation] = useState([33.450701, 126.570667]);
  const kakaoMap = map;

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
      return;
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 1000,
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
        type: SET_GEO,
      });
    }
  };
  return { getGeo };
};

export default useGeolocation;
