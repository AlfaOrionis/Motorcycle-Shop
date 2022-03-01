const Loader = (props) => {
  //styling in index.css
  if (!props.side) {
    return <div className="loader"></div>;
  } else {
    return (
      <div className="loader_side">
        <div></div>
      </div>
    );
  }
};

export default Loader;
