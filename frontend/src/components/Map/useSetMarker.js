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
  const dispatch = useDispatch();

  places = mainPlaces;
  kakaoMap = map;
  marker_old = oldMarker;
  overlay_old = oldOverlay;
  const setMarker = () => {
    // Marker 초기화
    marker_old.forEach((value) => {
      value.setMap(null);
    });
    // overlay 초기화
    overlay_old.forEach((value) => {
      value.setMap(null);
    });

    var marker_new = [];
    var overlay_new = [];

    // Marker 설정
    places.map((value, idx) => {
      console.log(value);
      const avg_score = parseFloat(value.averageScore.toFixed(2));

      const position = new kakao.maps.LatLng(value.latitude, value.longitude);
      var imageSrc = `/icons/${idx + 1}.png`;

      // 커스텀 오버레이 내용
      var content =
        '<div class="ui pointing below label">' +
        ` <div class="ui blue circular large label">${idx + 1}</div>` +
        ' <div>' +
        `   <a href="/places/${value.id}"><div class='title'>${value.name}</div></a>` +
        '   <div class="body">' +
        '   <i aria-hidden="true" class="star icon"></i>' +
        `   ${avg_score}&nbsp&nbsp&nbsp<span>${
          value.tags[0] ? '&#183;</span>' + value.tags[0] + '</div>' : ''
        }` +
        ' </div>' +
        '</div>';

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.CustomOverlay({
        map: null,
        position: position,
        content: content,
        clickable: true,
        yAnchor: 1,
      });
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(35, 35);
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
      };
      marker.setClickable(true);
      kakao.maps.event.addListener(marker, 'click', function () {
        openInfo();
        // document.querySelector('#mapOverlay').addEventListener('click', closeInfo);
        kakaoMap.panTo(position);
      });
      kakao.maps.event.addListener(kakaoMap, 'click', closeInfo);
      kakao.maps.event.addListener(kakaoMap, 'bounds_changed', function () {
        const mapCenter = kakaoMap.getCenter();
        localStorage.setItem('longitude', mapCenter.getLng());
        localStorage.setItem('latitude', mapCenter.getLat());
      });
    });

    dispatch({
      type: ADD_MARKER,
      overlay: overlay_new,
      marker: marker_new,
    });
  };
  return { setMarker };
};

export default useSetMarker;
