export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://daedong-food-map-api.herokuapp.com'
    : 'http://127.0.0.1:1234';
