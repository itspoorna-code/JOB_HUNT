import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import JobList from "./JobList";
import Application from "./ApplyForm"; // Assuming the Application component is created

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/apply/:jobId" element={<Application />} />{" "}
        {/* Route to application page */}
      </Routes>
    </Router>
  );
};

export default App;
