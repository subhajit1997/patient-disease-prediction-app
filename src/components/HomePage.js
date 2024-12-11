// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "../0014-manage-my-team.svg" // Adjust the path as necessary

const HomePage = () => {
    const navigate = useNavigate();

    const navigateToPatientForm = () => {
        navigate("/patient-form");
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            // Map description to testName
            if (data.recentTests) {
                data.recentTests = data.recentTests.map(test => ({
                    testName: test.description,
                    testData: test.testData
                }));
            }
            navigate("/patient-form", { state: { formData: data } });
        };
        reader.readAsText(file);

    };

    return (
        <div className="home-page">
            <div className="welcome-box">
                <div className="logo-title">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>MediExpert</h1>
                </div>
                <h2>Expert with AI disease predictor capabilities for Physicians</h2>
                <div className="button-container">
                    <button className="navigate-button" onClick={navigateToPatientForm}>
                        Go to Patient Form
                    </button>
                    <div className="file-upload">
                        <label htmlFor="file-upload" className="file-upload-label">
                            Upload JSON File
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="file-upload-input"
                            accept=".json"
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;