import "./App.css";
import { useState, useEffect } from "react";
import ShipSelector from "./shipselector/shipselector.js";
function App() {
  const ships = {
    carrier: { size: 5, orientation: "H", coordinates: [] },
    battleship: { size: 4, orientation: "H", coordinates: [] },
    cruiser: { size: 3, orientation: "H", coordinates: [] },
    submarine: { size: 3, orientation: "H", coordinates: [] },
    destroyer: { size: 2, orientation: "H", coordinates: [] },
  };
  const [shipNames, setShipNames] = useState(Object.keys(ships));
  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useState("H");

  function changeShipOrientation() {
    for (const ship of Object.values(ships)) {
      if (ship.coordinates.length === 0) {
        ship.orientation = orientation;
      }
    }
  }

  return (
    <div className="App">
      <ShipSelector
        orientation={orientation}
        index={index}
        shipNames={shipNames}
        setOrientation={setOrientation}
        setIndex={setIndex}
        setShipNames={setShipNames}
        changeShipOrientation={changeShipOrientation}
        id="ship-selector"
      />
    </div>
  );
}

export default App;
