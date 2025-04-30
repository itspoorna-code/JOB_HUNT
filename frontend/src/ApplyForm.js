import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyForm = () => {
  const { jobId } = useParams(); // important: get jobId from URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://job-hunt-nw7o.onrender.com/api/applications",
        {
          jobId, // make sure you are sending jobId
          name,
          email,
        }
      );

      console.log(response.data);
      alert("Application submitted successfully!");
      navigate("/job-list");
    } catch (error) {
      console.error(
        "Error submitting application:",
        error.response?.data || error.message
      );
      alert("Error submitting application. Check console.");
    }
  };

  return (
    <div className="apply-form">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyForm;
