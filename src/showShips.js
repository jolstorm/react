import { useContext } from "react";
import AppContext from "./Contexts/AppContext";

function Showships() {
  const { ships } = useContext(AppContext);

  let ret = Object.keys(ships).map((ship, index, arr) => {
    if (ships[ship].coordinates.length > 0) {
      let style = {
        top: 0,
        left: 0,
        height: 0,
        width: 0,
      };
      const o = ships[ship].orientation; // Orientation
      const l = ships[ship].size; //Length of ship
      const sc = ships[ship].coordinates[0]; //Start Coordinates
      style.height = o === "H" ? "40px" : `${(l - 1) * 5 + 40 * l}px`;
      style.width = o === "H" ? `${(l - 1) * 5 + 40 * l}px` : "40px";
      const tc =
        sc / 10 === 1
          ? 0
          : sc % 10 === 0
          ? Math.trunc(sc / 10) - 1
          : Math.trunc(sc / 10);
      const lc = Math.trunc(sc % 10) === 0 ? 10 : Math.trunc(sc % 10);

      style.top = `${5 + tc * 40 + tc * 5}px`;
      style.left = `${(lc - 1) * 40 + lc * 5}px`;
      // If key with value Date.now() is added here then something is working.Check.
      return (
        <div className="set" style={style}>
          {arr[index]}
        </div>
      );
    }
    return null;
  });
  return ret;
}

export default Showships;
