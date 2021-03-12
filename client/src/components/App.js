import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Landing from "./Landing";
import Choosetempormoi from "./Choosetempormoi";
import AllMySensors from "./AllMySensors";
import MoistureSensors from "./MoistureSensors";
import SensorDetails from "./SensorDetails";
import MoistureSensorDetails from "./MoistureSensorDetails";
import UserSpecificData from "./UserSpecificData";
import ChangeRange from "./ChangeRange";
import ChangeMoistureRange from "./ChangeMoistureRange";

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
              <Route exact path="/myfarming" component={UserSpecificData} />
              
              <Route exact path="/choosetempormoi" component={Choosetempormoi} />

              <Route exact path="/sensors" component={AllMySensors} />
              <Route exact path="/moisturesensors" component={MoistureSensors} />
                        
              <Route exact path="/changerange/:id" component={ChangeRange} />
              <Route exact path="/changemoisturerange/:id" component={ChangeMoistureRange} />
            
              <Route exact path="/moisturedetails/:id" component={MoistureSensorDetails} />
              <Route exact path="/details/:id" component={SensorDetails} />
            
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
