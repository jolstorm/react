// import { menuItems } from "./items";
// import MenuItems from "./MenuItems";

import "../Menu.css";
import { useState } from "react";
// function Menu() {
//   return (
//     <div className="menu">
//       <ul>
//         {menuItems.map((menu) => {
//           return <MenuItems items={menu} />;
//         })}
//       </ul>
//     </div>
//   );
// }

function Menu(props) {
  const [dropdown, setDropDown] = useState({});
  console.log(dropdown);
  return (
    <div className="menu">
      <ul className={props.dd ? "dropdown" : ""}>
        {props.menuItems.map((item) => {
          return item.subMenu ? (
            <>
              <button
                onClick={() => {
                  setDropDown({
                    ...dropdown,
                    [item.title]: !dropdown[item.title],
                  });
                }}
              >
                {item.title}
                {dropdown[item.title] ? (
                  <span className="down-arrow">&#8593;</span>
                ) : (
                  <span className="down-arrow">&#8595;</span>
                )}
              </button>
              {dropdown[item.title] && (
                <Menu menuItems={item.subMenu} dd={true} dropProp={dropdown} />
              )}
            </>
          ) : (
            <li>{item.title}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
