import React, { useState } from "react";
import "./App.css";
import Graph from "./Components/Graph";
import { getPoly, getZeros } from "./Utils/Ploy";
import Footer from "./Components/Footer";

function App() {
  const [poly, setPoly] = useState(undefined);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [zeros, setZeros] = useState([]);

  const formSubmit = (e) => {
    e.preventDefault();
    try {
      let dt = getPoly(text, 2, true);
      let deg = dt[0];
      let polyT = dt[1];

      let a = eval(polyT);

      if (deg < 4) {
        setPoly(text);
        setError("");
        setZeros(getZeros(text));
      } else {
        setError("Error - Invalid Input format... please read 'How to use' ");
      }
    } catch {
      setError("Error - Invalid Input format... please read 'How to use' ");
    }
  };

  return (
    <React.Fragment>
      <div className="app">
        <div className="app__userArea">
          <h2 className="app__header">Math Art Intgration Project</h2>
          <hr />
          <br />
          <form onSubmit={formSubmit}>
            <label>Enter the polynomial</label>
            <br />
            <input
              className="app__user_input"
              type="text submit"
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
            <br />
            <button
              className="app__btn"
              onClick={() => {
                setText("");
              }}
              type="button"
            >
              Clear
            </button>
            <button className="app__btn" type="submit" disabled={!text}>
              Evaluate
            </button>
          </form>
          <div className="app__error">
            <p style={{ color: "red" }}>{error}</p>
          </div>
          {poly && (
            <div className="app__card">
              <h3>Details</h3>
              <div style={{ marginLeft: 10 }}>
                <h4>Zeros - </h4>
                <ul style={{ marginTop: -15 }}>
                  {zeros.map((item) => (
                    <li>{item}</li>
                  ))}{" "}
                </ul>
                <h4>No of zeros - {zeros.length}</h4>
              </div>
            </div>
          )}
          <div className="app__card">
            <h3>How To use</h3>
            <ul>
              <li>Only accepts Linear, quadratic and cubic polynomials</li>
              <li>For exponent use "^"</li>
              <ol>Ex- x^2 + x + 1</ol>
              <li>Only accepts valid entries</li>
              <li>Only accepts polynomial in standard form</li>
              <li>Only accepts variable x</li>
              <li>
                use * symbol for multiplcation along with brackets eg- x^3 -
                x*(2-5)
              </li>
              <li>Leave a space, before and after +/- sign</li>
              <li>
                shows graphs and zeros for only 100 cases :- x = -50 to 50
              </li>
              <li>Uses only decimal values for x</li>
            </ul>
          </div>
        </div>
        <div className="app__graph" id="graph_div">
          <Graph poly={poly} />
        </div>
      </div>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
