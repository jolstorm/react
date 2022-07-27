import React from "react";
import MenuItems from "./MenuItems";
function Dropdown({ subMenu, dropDown }) {
  return (
    <ul className={`dropdown ${dropDown ? "show" : ""}`}>
      {subMenu.map((menu) => {
        return <MenuItems items={menu} />;
      })}
    </ul>
  );
}

export default Dropdown;
