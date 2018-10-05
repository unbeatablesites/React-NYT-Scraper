import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Home from "./components/Home/Home";
import Saved from "./components/Saved/Saved";

const App = () =>
  <div>
    <Router>
      <div>
        <NavTabs />
        <Route exact path="/" component={Home} />
        <Route exact path="/saved" component={Saved} />
        </div>
    </Router>
  </div>

export default App;
