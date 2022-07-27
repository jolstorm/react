import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Card from "./Card";
import "./Slider.css";
const cards = [
  "div1",
  "div2",
  "div3",
  "div4",
  "div5",
  "div6",
  "div7",
  "div8",
  "div9",
  "div10",
  "div11",
  "div12",
  "div13",
  "div14",
  "div15",
  "div16",
  "div17",
  "div18",
  "div19",
  "div20 ",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
  // "div11",
];

const breakPoints = [
  { min: 1400, max: 3000, n: 6, margin: 30, scrollSlide: 1 },
  { min: 1200, max: 1400, n: 5, margin: 15, scrollSlide: 1 },
  { min: 992, max: 1200, n: 4, margin: 15, scrollSlide: 2 },
  { min: 768, max: 992, n: 3, margin: 15, scrollSlide: 1 },
  { min: 576, max: 778, n: 2, margin: 15, scrollSlide: 2 },
  { min: 0, max: 575, n: 1.5, margin: 15, scrollSlide: 1 },
];
function Slider() {
  const [cardWidth, setCardWidth] = useState(0);
  console.log("Rendering");
  const rowRef = useRef();
  const rowWidth = useRef();
  const contRef = useRef();
  let currentMargin = useRef();
  let n = useRef();
  let scrollSlide = useRef();
  let left = useRef(0);
  const count = useRef(0);
  const l = cards.length;

  const handleResize = useCallback(() => {
    // console.log( rowRef.current.clientWidth);
    // console.log(window.innerWidth );
    breakPoints.forEach((spec) => {
      if (window.innerWidth >= spec.min && window.innerWidth < spec.max) {
        let width =
          (rowRef.current.clientWidth -
            (spec.margin > 0 ? spec.margin * (spec.n - 1) : 0)) /
          spec.n;

        setCardWidth(width);

        currentMargin.current = spec.margin;
        n.current = spec.n;
        scrollSlide.current = spec.scrollSlide;
        rowWidth.current = width * l + spec.margin * (spec.n - 1);
        return;
      }
    });
    console.log(rowRef.current.scrollLeft);
  }, [l]);
  useEffect(() => {
    console.log("Mounting");
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const scrollOffset = useMemo(() => {
    return [
      scrollSlide.current * (cardWidth + currentMargin.current),
      scrollSlide.current * (cardWidth + currentMargin.current),
      Number(
        ((scrollSlide.current * (cardWidth + currentMargin.current)) % 1.0)
          .toString()
          .slice(0, 4)
      ),
    ];
  }, [cardWidth]);

  // const scroll = (dir) => {
  //   if (dir === "r") {
  //     if (left.current <= rowWidth.current - contRef.current.clientWidth) {
  //       count.current++;
  //       left.current += scrollOffset[0];
  //       rowRef.current.style.transform = `translateX(-${left.current}px)`;
  //     }
  //   } else {
  //     if (left.current > 0) {
  //       left.current -= scrollOffset[0];
  //       rowRef.current.style.transform = `translateX(-${left.current}px)`;
  //     }
  //   }
  //   console.log(rowRef.current.style.transform);
  //   console.log(left.current);
  // };
  const scroll = (dir) => {
    if (dir === "r") {
      rowRef.current.scrollLeft = Math.round(
        rowRef.current.scrollLeft + scrollOffset[1]
      );
    } else {
      rowRef.current.scrollLeft = Math.round(
        rowRef.current.scrollLeft - scrollOffset[1]
      );
    }
    console.log(
      rowRef.current.scrollLeft,
      Math.round(rowRef.current.scrollLeft)
    );
    // console.log(scrollOffset[1]);
  };
  return (
    <div className="container">
      {/* <div className="slider-cont" ref={contRef}> */}
      <div className="slider" ref={rowRef}>
        {cards.map((card, index) => {
          return (
            <Card
              content={card}
              margin={index !== l - 1 ? currentMargin.current : 0}
              width={cardWidth}
            />
          );
        })}
      </div>
      {/* </div> */}
      <button onClick={() => scroll("l")}>Left</button>
      <button onClick={() => scroll("r")}>Right</button>
    </div>
  );
}

export default Slider;
