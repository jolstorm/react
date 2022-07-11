import { useEffect, useState } from "react";
import Loader from "./loader";
function ApiComponent() {
  const [result, setResult] = useState(null);
  const [content, setContent] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    let timer = setTimeout(a, 5000);
    let timer2;

    function a() {
      fetch("https://randomuser.me/api/?results=100")
        // fetch("https://rfid-sec-setup.herokuapp.com/api/v1/accesspoints", {
        //   // method: "POST",
        //   body: JSON.stringify({ userKey: "NJp6vp" }),

        .then((res) => res.json())
        .then((res) => {
          setResult(res.results);
        })
        .catch((err) => {
          console.log(err);
          setContent("Something went wrong.");
        })
        .finally(() => {
          timer2 = setTimeout(() => {
            setResult(null);
            setContent("Executing finally method ");
          }, 5000);
        });
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [refresh]);
  return (
    <>
      <button
        onClick={() => {
          setResult(null);
          setContent(null);
          setRefresh(!refresh);
        }}
      >
        Refresh
      </button>
      {result ? (
        result.map((r) => {
          return (
            <p>
              {r.name.first}, {r.gender}
            </p>
          );
        })
      ) : content ? (
        content
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ApiComponent;
