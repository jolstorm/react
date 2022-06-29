import { useRef, useEffect, useContext } from "react";
import Button from "./Button";
import Chevronleft from "../images/chevron-left.svg";
import Chevronright from "../images/chevron-right.svg";
import AppContext from "../Contexts/AppContext";

function ShipSelector(props) {
  const { ships } = useContext(AppContext);
  const { changeShipOrientation, setIndex } = props;
  const ship = useRef();
  function rotate() {
    props.setOrientation((prev) => (prev === "H" ? "V" : "H"));
    ship.current.classList.toggle("rotate");
  }

  function decIndex() {
    setIndex((prev) => {
      if (prev === 0) {
        return props.shipNames.length - 1;
      } else {
        return prev - 1;
      }
    });
  }
  function incIndex() {
    setIndex((prev) => {
      if (prev === props.shipNames.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }
  useEffect(() => {
    changeShipOrientation();
    console.log(ships[props.shipNames[props.index]]);
  }, [props.orientation]);
  return (
    <div id={props.id}>
      <Button
        id="prev-ship"
        image={Chevronleft}
        alt={"Arrow-Left"}
        onClick={decIndex}
      />
      <Button
        id="next-ship"
        image={Chevronright}
        alt={"Arrow-Right"}
        onClick={incIndex}
      />
      <div id="ship" ref={ship}>
        {props.shipNames[props.index]}
      </div>
      <Button buttonText="Rotate" id="rotate-button" onClick={rotate} />
    </div>
  );
}

export default ShipSelector;
