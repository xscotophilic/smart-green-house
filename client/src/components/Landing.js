import React, { Component } from "react";

import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#edf2fb" }}>
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l6">
              <h3
                style={{
                  paddingTop: "80px",
                  paddingBottom: "20px",
                  lineHeight: "1.3",
                  fontFamily: "archivo",
                  color: "#2b2d42",
                  textAlign: "justify",
                }}
              >
                “Agriculture is our wisest pursuit, because it will in the end
                contribute most to real{" "}
                <span className="underline">
                  wealth, good morals, and happiness.
                </span>
                ”
                <br />– Thomas Jefferson
              </h3>
            </div>
            <div className="col s12 m12 l6">
              <img src="webfirst.png" width="100%" alt="smart greenhouse"></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
