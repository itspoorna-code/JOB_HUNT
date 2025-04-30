import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetching job data
  useEffect(() => {
    axios
      .get("https://job-hunt-nw7o.onrender.com/api/jobs")
      .then((response) => {
        setJobs(response.data.data.jobs); // Assuming response data structure
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  // Apply for job function
  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="job-list container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="center-content">Available Jobs</h1>
      {loading ? (
        <p className="loader">Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Salary:</strong> {job.salary}
              </p>
              {job.available ? (
                <button onClick={() => handleApply(job._id)}>Apply</button>
              ) : (
                <p>Job unavailable</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
