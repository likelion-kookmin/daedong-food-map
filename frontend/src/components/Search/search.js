import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import 'styles/search.css';

let flag = false;
const Search = () => {
  const [value, setValue] = useState('');
  const { loadPlacesDone } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const getSearchPlaces = async () => {
    try {
      await dispatch({
        type: LOAD_PLACES_REQUEST,
        data: { value },
      });
      flag = true;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loadPlacesDone && flag) scrollTo();
  }, [loadPlacesDone]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchPlaces();
  };

  const scrollTo = () => {
    const mapHeight = document.querySelector('#mapOverlay').offsetHeight;
    const menuHeight = document.querySelector('.ui.menu').offsetHeight;
    window.scrollTo({ top: mapHeight + menuHeight, behavior: 'smooth' });
  };

  return (
    <section className="search">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <input
              className="input_search"
              type="text"
              value={value}
              onChange={handleChange}
              placeholder="먹고 싶은 음식을 찾아보세요!"
            />
            <i class="search large icon"></i>
          </div>
          <button type="submit">
            <i class="fas fa-location fa-2x"></i>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
