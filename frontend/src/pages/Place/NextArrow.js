const NextArrow = (props) => {
  const { className, style, onClick } = props;
  style.height = 'calc(2vw + 2vh)';
  style.width = 'auto';
  style.marginRight = 'calc(-0.5vh - 1vw)';
  return (
    <img
      className={className}
      src={process.env.PUBLIC_URL + '/images/nextArrow.png'}
      style={style}
      onClick={onClick}
      alt=""
    />
  );
};
export default NextArrow;
