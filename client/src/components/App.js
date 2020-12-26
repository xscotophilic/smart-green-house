import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Landing from "./Landing";
import Temptest from "./TempTest";
import AllMySensors from "./AllMySensors";
import SensorDetails from "./SensorDetails";
import UserSpecificData from "./UserSpecificData";

import history from "../history";

class App extends Component {
  render() {
    return (
      <div style={{ height: "100vh", backgroundColor: "#edf2fb" }}>
        <Router history={history}>
          <div>
            <Navbar />
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path='/temptest' component={Temptest} />
              <Route exact path="/myfarming" component={UserSpecificData} />
              <Route exact path="/sensors" component={AllMySensors} />
              <Route exact path='/details/:id' component={SensorDetails} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
