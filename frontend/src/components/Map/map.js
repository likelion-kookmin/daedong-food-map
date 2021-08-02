import React, { useState, useEffect } from 'react';
import '../../styles/map.css';
import Loading from '../Loading/loading.js';

const { kakao } = window;

const Map = () => {
  const [isLoading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);

  if (isLoading === true)
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setLoading(false);
    });

  useEffect(() => {
    if (isLoading === false) {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 마커를 표시할 위치와 title 객체 배열입니다.
      const positions = [
        {
          title: '떡볶이',
          latlng: [new kakao.maps.LatLng(latitude, longitude), new kakao.maps.LatLng(latitude + 0.0005, longitude + 0.0005), new kakao.maps.LatLng(latitude + 0.001, longitude + 0.001)],
          imageSrc: '/icons/떡볶이.png',
        },
        {
          title: '붕어빵',
          latlng: [
            new kakao.maps.LatLng(latitude - 0.0005, longitude - 0.0005),
            new kakao.maps.LatLng(latitude - 0.0008, longitude - 0.0008),
            new kakao.maps.LatLng(latitude - 0.001, longitude - 0.001),
          ],
          imageSrc: '/icons/붕어빵.png',
        },
      ];

      // 마커 이미지의 이미지 크기 입니다.
      const smallImageSize = new kakao.maps.Size(25, 25);
      const bigImageSize = new kakao.maps.Size(35, 35);
      const infos = [];
      const markers = [];
      const images = [];
      positions.forEach((position, idx) => {
        // 마커 이미지를 생성합니다.
        const smallMarkerImage = new kakao.maps.MarkerImage(position.imageSrc, smallImageSize);

        const bigMarkerImage = new kakao.maps.MarkerImage(position.imageSrc, bigImageSize);

        for (let j = 0; j < position.latlng.length; j++) {
          // 마커를 생성합니다.
          const marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: position.latlng[j], // 마커를 표시할 위치
            title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
            image: smallMarkerImage, // 마커 이미지
            clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록
          });

          const iwContent = `<div style="padding:5px;">${position.title}</div><button class='close btn'>x</button>`;

          const info = new kakao.maps.InfoWindow({
            content: iwContent,
          });

          infos.push(info);
          markers.push(marker);
          images.push(smallMarkerImage);

          // info 열기
          const openInfo = () => {
            infos.forEach((each) => each.close()); //모든 인포 닫기
            info.open(map, marker);
          };

          const closeInfo = () => {
            infos.forEach((each) => each.close());
            markers.forEach((marker, idx) => marker.setImage(images[idx]));
          };
          // 마커 클릭했을 때 이벤트
          kakao.maps.event.addListener(marker, 'click', () => {
            openInfo();
            document.querySelector('.close').addEventListener('click', closeInfo);
            markers.forEach((marker, idx) => marker.setImage(images[idx]));
            marker.setImage(bigMarkerImage);
            map.panTo(position.latlng[j]);
          });

          kakao.maps.event.addListener(map, 'click', closeInfo);
        }
      });
    }
  }, [isLoading]);

  return <section className="container">{isLoading ? <Loading /> : <div id="map"></div>}</section>;
};
export default Map;
