import "./App.css";
import { useState } from "react";
import ShipSelector from "./shipselector/shipselector.js";
import Block from "./gridblocks";
import AppContext from "./Contexts/AppContext";
import Button from "./shipselector/Button";
import Showships from "./showShips";
function App() {
  let values = [];
  for (let i = 1; i < 101; i = i + 1) {
    values.push([i, false, false]);
  }

  const [blockState, setBlockState] = useState(values);
  const shipObject = {
    carrier: { size: 5, orientation: "H", coordinates: [] },
    battleship: { size: 4, orientation: "H", coordinates: [] },
    cruiser: { size: 3, orientation: "H", coordinates: [] },
    submarine: { size: 3, orientation: "H", coordinates: [] },
    destroyer: { size: 2, orientation: "H", coordinates: [] },
  };
  const [ships, setShips] = useState(shipObject);
  const [shipNames, setShipNames] = useState(Object.keys(ships));
  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useState("H");
  const [hidden, setHidden] = useState(false);

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
        setShips,
        blockState,
        setBlockState,
        shipNames,
        setShipNames,
        index,
        setIndex,
        orientation,

        hidden,
        setHidden,
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

        <div className="buttons">
          <Button
            buttonText={`${hidden ? "Show" : "Hide"}`}
            style={{ width: "50px" }}
            onClick={() => {
              setHidden(!hidden);
            }}
          ></Button>
          <Button
            buttonText="Start Game"
            style={{ width: "100px" }}
            disabled={shipNames.length > 0 ? true : false}
          ></Button>
        </div>

        <div id="grid">
          {blockState.map((value, index) => {
            return (
              <Block
                blockIndex={index + 1}
                background={
                  // value[2] === true
                  //   ? "black"
                  //   :
                  value[1] ? "black" : "lightskyblue"
                }
              ></Block>
            );
          })}
          {hidden ? null : <Showships />}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
