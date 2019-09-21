import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import DrawingSurface from "./drawing-surface";
import Circle from "./elements/circle";

function App() {
  return (
    <div className="App">
      <DrawingSurface>
        <Circle />
      </DrawingSurface>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
