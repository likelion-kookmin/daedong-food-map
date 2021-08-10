import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOAD_PLACES_REQUEST } from 'reducers/place';
import 'styles/search.css';

const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const getSearchPlaces = async () => {
    try {
      await dispatch({
        type: LOAD_PLACES_REQUEST,
        data: { value },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchPlaces();
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
