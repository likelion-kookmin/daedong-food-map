/**********************************`
 `* Name : styleUtil.js`
 `* Author : Kim Minjeong(minjj0905)`
 `* Introduction : 화면 사이즈에 따른 media 쿼리를 통한 자동 리사이징, 그림자 효과 간편화를 위한 유틸`
 `*`
 `********************************** */

import { css } from 'styled-components';

// 미디어 쿼리 분기점 지정
export const sizes = {
  wide: '1200px',
  desktop: '992px',
  tablet: '768px',
  phone: '376px',
};

// 미디어 쿼리 자동 리사이징
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

// shadow 효과 지정, 0->5 단계
export const shadow = (weight) => {
  const shadows = [
    css`
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    css`
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    `,
    css`
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    `,
  ];

  return shadows[weight];
};
