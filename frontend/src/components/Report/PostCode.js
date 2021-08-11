import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const { kakao } = window;

const PostCode = (props) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    var geocoder = new kakao.maps.services.Geocoder();

    var callback = function (result, status) {
      if (result && result[0]) {
        props.setLatitude(result[0].y);
        props.setLongitude(result[0].x);
      }
    };
    geocoder.addressSearch(fullAddress, callback);
    props.setAddress(fullAddress);
    props.setStep(0);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

export default PostCode;
