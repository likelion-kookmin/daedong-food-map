import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MAP } from '../../reducers/map';
import Search from 'components/Search/search.js';
import 'styles/map.css';

const { kakao } = window;

const KakaoMap = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.map);
  useEffect(() => {
    try {
      const container = document.getElementById('mapOverlay');
      const options = {
        center: new kakao.maps.LatLng(37.51260163813798, 127.05525734428048),
        level: 6,
      };
      const map = new kakao.maps.Map(container, options);

      dispatch({
        type: SET_MAP,
        map: map,
      });
    } catch (err) {
      alert('지도 정보가 불러와지지 않습니다. 다시 시도해 주십시오.');
    }
  }, [dispatch]);

  return (
    <div id="mapOverlay">
      {loading ? (
        <div className="ui placeholder">
          <div className="rectangular image"></div>
        </div>
      ) : (
        ''
      )}
      <Search />
    </div>
  );
};

export default KakaoMap;
