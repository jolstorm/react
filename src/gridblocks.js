import { useContext } from "react";
import AppContext from "./Contexts/AppContext";
function Block(props) {
  const { blockIndex } = props;
  const {
    ships,
    setShips,
    index,
    setIndex,
    blockState,
    setBlockState,
    shipNames,
    setShipNames,
    orientation,
    setHidden,
  } = useContext(AppContext);

  const highlightBlocks = () => {
    if (shipNames.length === 0) return;

    const length = ships[shipNames[index]].size;
    let n = Array.from(blockState);
    let flag = true;
    function check(value) {
      while (value % 10 !== 0) {
        value++;
      }
      return value;
    }
    if (orientation === "H") {
      if (blockIndex + length - 1 <= check(blockIndex)) {
        for (let i = blockIndex; i < blockIndex + length; i = i + 1) {
          if (blockState[i - 1][2] === true) {
            flag = false;
          }
        }
        if (flag) {
          for (let i = blockIndex; i < blockIndex + length; i = i + 1) {
            n[i - 1][1] = true;
          }
        }
      }
    } else {
      if (blockIndex + (length - 1) * 10 <= 100) {
        for (
          let i = blockIndex;
          i <= blockIndex + (length - 1) * 10;
          i = i + 10
        ) {
          if (blockState[i - 1][2] === true) {
            flag = false;
          }
        }
        if (flag) {
          for (
            let i = blockIndex;
            i <= blockIndex + (length - 1) * 10;
            i = i + 10
          ) {
            n[i - 1][1] = true;
          }
        }
      }
    }

    setBlockState(n);
  };

  const removeHiglightedBlocks = () => {
    if (shipNames.length === 0) return;
    const length = ships[shipNames[index]].size;
    let n = Array.from(blockState);
    let flag = true;
    function check(value) {
      while (value % 10 !== 0) {
        value++;
      }
      return value;
    }
    if (orientation === "H") {
      if (blockIndex + length - 1 <= check(blockIndex)) {
        for (let i = blockIndex; i <= blockIndex + length; i = i + 1) {
          if (blockState[i - 1][2] === true) {
            // console.log(i);
            flag = false;
          }
        }
        if (flag) {
          for (let i = blockIndex; i <= blockIndex + length; i = i + 1) {
            console.log(i);
            n[i - 1][1] = false;
          }
        }
      }
    } else {
      if (blockIndex + (length - 1) * 10 <= 100) {
        for (
          let i = blockIndex;
          i <= blockIndex + (length - 1) * 10;
          i = i + 10
        ) {
          if (blockState[i - 1][2] === true) {
            flag = false;
          }
        }
        if (flag) {
          for (let i = blockIndex; i <= blockIndex + length * 10; i = i + 10) {
            console.log(i);
            n[i - 1][1] = false;
          }
        }
      }
    }

    setBlockState(n);
  };

  const setShipCoordinates = () => {
    if (shipNames.length === 0) return;

    const length = ships[shipNames[index]].size;
    let n = Array.from(blockState);
    let flag = true;
    let coordinates = [];
    function check(value) {
      while (value % 10 !== 0) {
        value++;
      }
      return value;
    }
    if (orientation === "H") {
      if (blockIndex + length - 1 <= check(blockIndex)) {
        for (let i = blockIndex; i < blockIndex + length; i = i + 1) {
          if (blockState[i - 1][2] === true) {
            flag = false;
          }
        }
        if (flag) {
          for (let i = blockIndex; i < blockIndex + length; i = i + 1) {
            coordinates.push(i);
            n[i - 1][2] = true;
            n[i - 1][1] = false;
          }
        }
      }
    } else {
      if (blockIndex + (length - 1) * 10 <= 100) {
        for (
          let i = blockIndex;
          i <= blockIndex + (length - 1) * 10;
          i = i + 10
        ) {
          if (blockState[i - 1][2] === true) {
            flag = false;
          }
        }
        if (flag) {
          for (
            let i = blockIndex;
            i <= blockIndex + (length - 1) * 10;
            i = i + 10
          ) {
            coordinates.push(i);

            n[i - 1][2] = true;
            n[i - 1][1] = false;
          }
        }
      }
    }
    // if (shipNames.length === 1) {
    //   removeHiglightedBlocks();
    // }
    setHidden((prev) => (prev ? true : false));
    let duplicate = JSON.parse(JSON.stringify(ships));
    duplicate[shipNames[index]].coordinates = coordinates;
    setShips(duplicate);
    let b = [...shipNames];
    b.splice(index, 1);
    setShipNames(b);
    setIndex((prev) => {
      if (prev > shipNames.length - 1) return shipNames.length - 1;
      return prev;
    });
    setBlockState(n);
  };

  return (
    <div
      className="grid-block"
      style={{ background: props.background }}
      onMouseEnter={highlightBlocks}
      onMouseLeave={removeHiglightedBlocks}
      onClick={() => {
        setShipCoordinates();
      }}
    ></div>
  );
}

export default Block;
