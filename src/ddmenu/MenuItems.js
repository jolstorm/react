import { useState } from "react";
import Dropdown from "./Dropdown";
function MenuItems(props) {
  const [dropDown, setDropDown] = useState(false);
  const { items } = props;
  return items.subMenu ? (
    <>
      <button
        onClick={() => {
          setDropDown(!dropDown);
        }}
      >
        {items.title}
        {dropDown ? (
          <span className="down-arrow">&#8593;</span>
        ) : (
          <span className="down-arrow">&#8595;</span>
        )}
      </button>
      <Dropdown subMenu={items.subMenu} dropDown={dropDown} />
    </>
  ) : (
    <li>{items.title}</li>
  );
}

export default MenuItems;
