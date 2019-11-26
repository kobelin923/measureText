import React from "react";
import ReactDOM from "react-dom";
import calculateSize from "calculate-size";
import "./styles.css";

const calcFontSize = (str, width, initFontSize = 12, font = "Arial") => {
  let fontSize = initFontSize;
  let initSize = calculateSize(str, {
    font,
    fontSize: `${fontSize}px`
  });
  const lastFontSize = 8;
  if (initSize.width === width) {
    return fontSize;
  } else if (initSize.width > width) {
    while (true) {
      const size1 = calculateSize(str, {
        font,
        fontSize: `${(fontSize = -0.5)}px`
      });
      const size2 = calculateSize(str, {
        font,
        fontSize: `${(fontSize -= 0.5)}px`
      });
      console.log(
        initSize.width,
        size1.width,
        size2.width,
        size2.width <= width
      );
      if (size1.width >= width && size2.width <= width) {
        break;
      } else {
        fontSize -= 0.5;
      }
    }
  } else {
    while (true) {
      const size = calculateSize(str, {
        font,
        fontSize: `${fontSize}px`
      });
      if (size.width >= width) {
        break;
      } else {
        fontSize += 0.5;
      }
    }
  }

  return fontSize >= lastFontSize ? fontSize : lastFontSize;
};

function App() {
  const str = "Hello完全你好吗你在哪里我很好 world!";
  const size = calculateSize(str, {
    font: "Arial",
    fontSize: "14px"
  });
  const fontSize = calcFontSize(str, 300, 9);

  return (
    <div className="App">
      <h1>Font Size {fontSize}</h1>
      <h1>Hello CodeSandbox {size.height}</h1>
      <h2>Start editing to see some magic happen! {size.width}</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
