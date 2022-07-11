import React, { useContext, useRef } from "react";
import AppContext from "./Contexts/AppContext";

const Block = React.forwardRef((props, ref) => {
  const { blockIndex } = props;
  const currentBlock = useRef();
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
    setOrientation,
    setHidden,
    startGame,
    hitCount,
    setHitCount,
    hitBlock,
    setHitBlock,
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
        for (let i = blockIndex; i < blockIndex + length; i = i + 1) {
          if (blockState[i - 1][2] === true) {
            flag = false;
          }
        }
        if (flag) {
          for (let i = blockIndex; i <= blockIndex + length; i = i + 1) {
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

    setHidden((prev) => (prev ? true : false));
    let duplicate = JSON.parse(JSON.stringify(ships));
    duplicate[shipNames[index]].coordinates = coordinates;
    setShips(duplicate);
    let b = [...shipNames];
    b.splice(index, 1);
    setShipNames(b);
    console.log(shipNames);
    setIndex((prev) => {
      if (prev === b.length) return b.length - 1;
      return prev;
    });
    console.log(index);
    setBlockState(n);
    if (shipNames.lenght === 0) {
      setOrientation("H");
    }
    //State changes need to be in the correct order
  };

  function hitOrMiss() {
    let boom = false;
    Object.values(ships).forEach((ship) => {
      ship.coordinates.forEach((coordinate) => {
        if (coordinate === blockIndex && blockState[blockIndex - 1][2]) {
          ref.current.currentTime = 0;
          ref.current.play();
          setHitBlock((prev) => {
            prev.push(coordinate);
            return prev;
          });
          // This was not working without !important in CSS because react renders inline style
          // currentBlock.current.style.background = "orange";
          //This will also work

          //Moved setHitCount from here to line 210 because forEach is a function and when the return statement executes the useEffect runs before the class addition to the block.
          boom = true;
          blockState[blockIndex - 1][2] = false;
          return;
        }
      });
      if (boom) {
        //setHitCount was used here but it was updating the state 5 times regardless of the conditional statement so be careful about using state inside forEach or other loops
        return;
      }
    });

    if (!boom) {
      if (!currentBlock.current.classList.contains("explode")) {
        currentBlock.current.classList.add("miss");
        return;
      }
    } else {
      setHitCount((prev) => prev + 1);
    }
  }

  const classes = `grid-block${
    hitBlock.includes(blockIndex) ? " explode" : ""
  }`;

  return (
    <div
      ref={currentBlock}
      className={classes}
      style={{ background: props.background }}
      onMouseEnter={highlightBlocks}
      onMouseLeave={removeHiglightedBlocks}
      onClick={() => {
        !startGame
          ? setShipCoordinates()
          : hitCount < 17
          ? hitOrMiss()
          : alert("Game is over");
      }}
    ></div>
  );
});

export default Block;
