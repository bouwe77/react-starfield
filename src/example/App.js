import { useState } from "react";
import Starfield from "../starfield/Starfield";

export default function App() {
  const [speed, setSpeed] = useState(3);

  function increaseSpeed() {
    if (speed < 10) setSpeed(speed + 1);
  }

  function decreaseSpeed() {
    if (speed > 0) setSpeed(speed - 1);
  }

  return (
    <>
      <h1>Starfield</h1>
      <Starfield speed={speed} />
      <div>
        Speed: <button onClick={decreaseSpeed}>-</button> {speed}{" "}
        <button onClick={increaseSpeed}>+</button>
      </div>
    </>
  );
}
