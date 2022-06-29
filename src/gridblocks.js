import { useContext, useEffect } from "react";
import AppContext from "./Contexts/AppContext";
function Block(props) {
  const { blockIndex } = props;
  const {
    ships,
    index,
    setIndex,
    blockState,
    setBlockState,
    shipNames,
    setShipNames,
    orientation,
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
    console.log(shipNames);
    console.log(index);
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
            n[i - 1][2] = true;
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
            n[i - 1][2] = true;
          }
        }
      }
    }
    shipNames.splice(index, 1);
    setShipNames(shipNames);
    setIndex((prev) => {
      if (prev > shipNames.length - 1) return shipNames.length - 1;
    });
    setBlockState(n);
  };

  return (
    <div
      className="grid-block"
      style={{ background: props.background }}
      onMouseEnter={highlightBlocks}
      onMouseLeave={removeHiglightedBlocks}
      onClick={setShipCoordinates}
    ></div>
  );
}

export default Block;
