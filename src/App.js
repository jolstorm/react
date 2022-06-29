import "./App.css";
import { useState } from "react";
import ShipSelector from "./shipselector/shipselector.js";
import Block from "./gridblocks";
import AppContext from "./Contexts/AppContext";

function App() {
  let values = [];
  for (let i = 1; i < 101; i = i + 1) {
    values.push([i, false, false]);
  }

  const [blockState, setBlockState] = useState(values);
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
    <AppContext.Provider
      value={{
        ships,
        blockState,
        setBlockState,
        shipNames,
        setShipNames,
        index,
        setIndex,
        orientation,
      }}
    >
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
        <div id="grid">
          {blockState.map((value, index) => {
            return (
              <Block
                blockIndex={index + 1}
                background={
                  value[2] === true
                    ? "black"
                    : value[1] === true
                    ? "black"
                    : "lightskyblue"
                }
              ></Block>
            );
          })}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
