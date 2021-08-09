import { useSelector, useDispatch } from 'react-redux';
import { ADD_MARKER } from '../../reducers/map';
const { kakao } = window;

var places = [];
var kakaoMap = {};
var marker_old = [];
var overlay_old = [];

const useSetMarker = () => {
  const mainPlaces = useSelector((state) => state.place.mainPlaces);
  const { map, oldMarker, oldOverlay } = useSelector((state) => state.map);
  console.log(map, oldMarker, oldOverlay);
  const dispatch = useDispatch();
  places = mainPlaces;
  kakaoMap = map;
  marker_old = oldMarker;
  overlay_old = oldOverlay;
  const setMarker = () => {
    // Marker 초기화
    marker_old.map((value) => {
      value.setMap(null);
    });
    // overlay 초기화
    overlay_old.map((value) => {
      value.setMap(null);
    });

    var marker_new = [];
    var overlay_new = [];

    // Marker 설정
    places.map((value) => {
      const position = new kakao.maps.LatLng(value.latitude, value.longitude);
      var imageSrc = '/icons/붕어빵.png';

      // 커스텀 오버레이 내용
      const content =
        '<div class="overlaybox">' +
        '    <div class="boxtitle">금주 영화순위</div>' +
        '    <div class="first">' +
        '        <div class="triangle text">1</div>' +
        '        <div class="movietitle text">드래곤 길들이기2</div>' +
        '    </div>' +
        '    <ul>' +
        '        <li class="up">' +
        '            <span class="number">2</span>' +
        '            <span class="title">명량</span>' +
        '            <span class="arrow up"></span>' +
        '            <span class="count">2</span>' +
        '        </li>' +
        '        <li>' +
        '            <span class="number">3</span>' +
        '            <span class="title">해적(바다로 간 산적)</span>' +
        '            <span class="arrow up"></span>' +
        '            <span class="count">6</span>' +
        '        </li>' +
        '        <li>' +
        '            <span class="number">4</span>' +
        '            <span class="title">해무</span>' +
        '            <span class="arrow up"></span>' +
        '            <span class="count">3</span>' +
        '        </li>' +
        '        <li>' +
        '            <span class="number">5</span>' +
        '            <span class="title">안녕, 헤이즐</span>' +
        '            <span class="arrow down"></span>' +
        '            <span class="count">1</span>' +
        '        </li>' +
        '    </ul>' +
        '</div>';

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: null,
        position: position,
        content: content,
        yAnchor: 1,
      });
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(25, 25);
      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: kakaoMap, // 마커를 표시할 지도
        position: position, // 마커를 표시할 위치
        title: value.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
      marker_new.push(marker);
      overlay_new.push(customOverlay);
      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다

      // customOverlay 열기
      const openInfo = () => {
        overlay_new.forEach((each) => each.setMap(null)); //모든 인포 닫기
        customOverlay.setMap(kakaoMap);
      };

      const closeInfo = () => {
        overlay_new.forEach((each) => each.setMap(null));
        // marker_new.forEach((marker, idx) => marker.setImage(images[idx]));
      };

      kakao.maps.event.addListener(marker, 'click', function () {
        openInfo();
        // document.querySelector('.close').addEventListener('click', closeInfo);
        // marker_new.forEach((marker, idx) => marker.setImage());
        // marker.setImage(bigMarkerImage);

        kakaoMap.panTo(position);
      });
      kakao.maps.event.addListener(kakaoMap, 'click', closeInfo);
    });

    dispatch({
      type: ADD_MARKER,
      overlay: overlay_new,
      marker: marker_new,
    });
    console.log(overlay_new, places);
  };
  return { setMarker };
};

export default useSetMarker;
