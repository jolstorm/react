import { useRef, useEffect } from "react";
import Button from "./Button";
import Chevronleft from "../images/chevron-left.svg";
import Chevronright from "../images/chevron-right.svg";

function ShipSelector(props) {
  const { changeShipOrientation, setIndex } = props;
  const ship = useRef();
  function rotate() {
    props.setOrientation((prev) => (prev === "H" ? "V" : "H"));
    ship.current.classList.toggle("rotate");
  }

  function incIndex() {
    setIndex((prev) => {
      if (props.index === 0) {
        return props.shipNames.length - 1;
      } else {
        return prev - 1;
      }
    });
  }
  function decIndex() {
    setIndex((prev) => {
      if (props.index === props.shipNames.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }
  useEffect(() => {
    changeShipOrientation();
  }, [props.orientation, changeShipOrientation]);
  return (
    <div id={props.id}>
      <Button
        id="prev-ship"
        image={Chevronleft}
        alt={"Arrow-Left"}
        onClick={incIndex}
      />
      <Button
        id="next-ship"
        image={Chevronright}
        alt={"Arrow-Right"}
        onClick={decIndex}
      />
      <div id="ship" ref={ship}>
        {props.shipNames[props.index]}
      </div>
      <Button buttonText="Rotate" id="rotate-button" onClick={rotate} />
    </div>
  );
}

export default ShipSelector;
