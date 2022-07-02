import { useContext } from "react";
import AppContext from "./Contexts/AppContext";
function SelectedShips() {
  const { ships } = useContext(AppContext);
}
