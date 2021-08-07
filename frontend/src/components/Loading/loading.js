import React from 'react';
import 'styles/loading.css';

const Loading = () => {
  return (
    <div className="ui segment">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading</div>
      </div>
    </div>
  );
};

export default Loading;
