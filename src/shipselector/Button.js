function Button(props) {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      style={props.style}
      disabled={props.disabled}
    >
      {props.image ? (
        <img src={props.image} alt={props.alternate} />
      ) : (
        props.buttonText
      )}
    </button>
  );
}

export default Button;
