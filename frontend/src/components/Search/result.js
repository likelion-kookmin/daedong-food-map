import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'styles/result.css';

const Result = () => {
  const places = useSelector((state) => state.place.mainPlaces);

  return <section className="result">{places.length !== 0 ? <div className="resultOverlay"></div> : <div></div>}</section>;
};
export default Result;
