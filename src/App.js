// PVApp.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectArrayConfig from "./components/ProjectArrayConfig";
import ProjectScanningWorkflow from "./components/ProjectScanningWorkflow";
import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route
            path="/projects/:projectId/config"
            element={<ProjectArrayConfig />}
          />
          <Route
            path="/projects/:projectId/scan"
            element={<ProjectScanningWorkflow />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
