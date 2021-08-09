import { useSelector } from 'react-redux';
const { kakao } = window;

var kakaoMap = {};

const useGeolocation = () => {
  const { map } = useSelector((state) => state.map);

  kakaoMap = map;
  const getGeo = () => {
    if (navigator.geolocation) {
      if (kakaoMap !== null)
        navigator.geolocation.getCurrentPosition((position) => {
          const nowPosition = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );
          kakaoMap.panTo(nowPosition);
        });
    } else alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
  };
  return { getGeo };
};

export default useGeolocation;
