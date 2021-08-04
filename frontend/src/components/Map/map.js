import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/map.css';

const { kakao } = window;

const Map = () => {
  const isLoading = useSelector((state) => state.place.loadPlacesLoading);
  const places = useSelector((state) => state.place.mainPlaces);
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);

  useEffect(() => {
    // dispatch({
    //   type: LOAD_PLACES_REQUEST,
    // });
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
  }, []);

  useEffect(() => {
    if (isLoading === false && places.length) {
      console.log(latitude, longitude);
      const mapContainer = document.getElementById('mapOverlay');
      const mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 마커 이미지의 이미지 크기 입니다.
      const smallImageSize = new kakao.maps.Size(25, 25);
      const bigImageSize = new kakao.maps.Size(35, 35);
      const overlays = [];
      const markers = [];
      const images = [];

      places.forEach((place, idx) => {
        // 마커 이미지를 생성합니다.
        const position = new kakao.maps.LatLng(place.latitude, place.longitude);
        const smallMarkerImage = new kakao.maps.MarkerImage(`/icons/${place.name}.png`, smallImageSize);
        const bigMarkerImage = new kakao.maps.MarkerImage(`/icons/${place.name}.png`, bigImageSize);

        // 마커를 생성합니다.
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: position, // 마커를 표시할 위치
          title: place.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
          image: smallMarkerImage, // 마커 이미지
          clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록
        });

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

        // 커스텀 오버레이 생성
        const customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });

        overlays.push(customOverlay);
        markers.push(marker);
        images.push(smallMarkerImage);

        // customOverlay 열기
        const openInfo = () => {
          overlays.forEach((each) => each.setMap(null)); //모든 인포 닫기
          customOverlay.setMap(map);
        };

        const closeInfo = () => {
          overlays.forEach((each) => each.setMap(null));
          markers.forEach((marker, idx) => marker.setImage(images[idx]));
        };

        // 마커 클릭했을 때 이벤트
        kakao.maps.event.addListener(marker, 'click', () => {
          openInfo();
          // document.querySelector('.close').addEventListener('click', closeInfo);
          markers.forEach((marker, idx) => marker.setImage(images[idx]));
          marker.setImage(bigMarkerImage);
          map.panTo(position);
        });

        kakao.maps.event.addListener(map, 'click', closeInfo);
      });
    }
  }, [isLoading]);

  return (
    <section className="map">
      <div id="mapOverlay"></div>
    </section>
  );
};
export default Map;
