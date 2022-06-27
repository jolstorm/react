function Button(props) {
  return (
    <button id={props.id} onClick={props.onClick}>
      {props.image ? (
        <img src={props.image} alt={props.alternate} />
      ) : (
        props.buttonText
      )}
    </button>
  );
}

export default Button;
