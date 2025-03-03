import React from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Registration from "./Auth/Registrartation";

import Logins from "./Auth/Logins";
import HomePage from "./Pages/Home/HomePage";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Logins />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
