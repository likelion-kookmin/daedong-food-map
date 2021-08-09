const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  style.height = 'calc(2vw + 2vh)';
  style.width = 'auto';
  style.marginLeft = 'calc(-0.5vh - 1vw)';
  return (
    <img
      className={className}
      src={process.env.PUBLIC_URL + '/images/prevArrow.png'}
      style={style}
      onClick={onClick}
      alt=""
    />
  );
};

export default PrevArrow;
