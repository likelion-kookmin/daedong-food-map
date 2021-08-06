import React from 'react';
import 'styles/loading.css';

const Loading = () => {
  return (
    <div class="ui segment">
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
    </div>
  );
};

export default Loading;
