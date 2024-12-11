import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import "./PatientForm.css"; // Import CSS
import ResultSection from "./ResultSection";

const PatientForm = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        bmi: "", 
        habits: "", 
        medicalHistory: [""],
        familyHistory: "", 
        previousDiagnoses: [""],
        currentSymptoms: "",
        recentTests: [{ testName: "", testData: ["", "", ""] }],
        clinicalNotes: [""], 
        otherInfo: "", 
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const resultSectionRef = useRef(null);
    const loadingRef = useRef(null);

    useEffect(() => {
        if (location.state && location.state.formData) {
            setFormData(location.state.formData);
        }
    }, [location.state]);

    useEffect(() => {
        if (loading) {
            loadingRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [loading]);

    const handleChange = (e, index, type, monthIndex = null) => {
        if (type === "recentTests") {
            const updatedTests = [...formData.recentTests];
            if (monthIndex !== null) {
                updatedTests[index].testData[monthIndex] = e.target.value; // Update specific month's data
            } else {
                updatedTests[index][e.target.name] = e.target.value; // Update testName
            }
            setFormData({ ...formData, recentTests: updatedTests });
        } else if (type === "medicalHistory") {
            const updatedHistory = [...formData.medicalHistory];
            updatedHistory[index] = e.target.value;
            setFormData({ ...formData, medicalHistory: updatedHistory });
        } else if (type === "previousDiagnoses") {
            const updatedDiagnoses = [...formData.previousDiagnoses];
            updatedDiagnoses[index] = e.target.value;
            setFormData({ ...formData, previousDiagnoses: updatedDiagnoses });
        } else if (type === "clinicalNotes") {
            const updatedNotes = [...formData.clinicalNotes];
            updatedNotes[index] = e.target.value;
            setFormData({ ...formData, clinicalNotes: updatedNotes });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const addField = (type) => {
        if (type === "recentTests") {
            setFormData({
                ...formData,
                recentTests: [...formData.recentTests, { testName: "", testData: ["", "", ""] }],
            });
        } else if (type === "medicalHistory") {
            setFormData({ ...formData, medicalHistory: [...formData.medicalHistory, ""] });
        } else if (type === "previousDiagnoses") {
            setFormData({ ...formData, previousDiagnoses: [...formData.previousDiagnoses, ""] });
        } else if (type === "clinicalNotes") {
            setFormData({ ...formData, clinicalNotes: [...formData.clinicalNotes, ""] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading progress bar
        // Transform test data to include 'description' key
        const processedTests = formData.recentTests.map((test) => ({
            description: test.testName, // Map testName to description
            testData: test.testData,
        }));
        const dataToSend = {
            age: formData.age,
            gender: formData.gender,
            bmi: formData.bmi,
            habits: formData.habits,
            medicalHistory: formData.medicalHistory,
            familyHistory: formData.familyHistory,
            previousDiagnoses: formData.previousDiagnoses,
            currentSymptoms: formData.currentSymptoms,
            recentTests: processedTests,
            clinicalNotes: formData.clinicalNotes,
            otherInfo: formData.otherInfo,
        };
        console.log("Form data being submitted:", dataToSend); // Debugging
        try {
            const response = await axios.post("http://localhost:5000/analyze", dataToSend);
            console.log("response:" + response.data)
            setResult(response.data);
            resultSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (error) {
            console.error("Error submitting data", error);
        } finally {
            setLoading(false); // Hide loading progress bar
        }
    };

    return (
        <div>
            <form className="patient-form" onSubmit={handleSubmit}>
                <h2>Patient Information</h2>
                <div className="inline-fields">
                    <label>
                        Age:
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Gender:
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <label>
                        BMI:
                        <input
                            type="number"
                            name="bmi"
                            value={formData.bmi}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <h3>Patient Habits</h3>
                <textarea
                    name="habits"
                    placeholder="Patient habits"
                    value={formData.habits}
                    onChange={handleChange}
                ></textarea>

                <h3>Medical History</h3>
                {formData.medicalHistory.map((disease, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="Enter disease"
                        value={disease}
                        onChange={(e) => handleChange(e, index, "medicalHistory")}
                    />
                ))}
                <button type="button" onClick={() => addField("medicalHistory")}>
                    Add History
                </button>
                
                <h3>Family History</h3>
                <textarea
                    name="familyHistory"
                    placeholder="Family History"
                    value={formData.familyHistory}
                    onChange={handleChange}
                ></textarea>
                
                <h3>Previous Diagnoses</h3>
                {formData.previousDiagnoses.map((diagnosis, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="Enter diagnosis"
                        value={diagnosis}
                        onChange={(e) => handleChange(e, index, "previousDiagnoses")}
                    />
                ))}
                <button type="button" onClick={() => addField("previousDiagnoses")}>
                    Add Diagnosis
                </button>

                <h3>Current Symptoms</h3>
                <textarea
                    name="currentSymptoms"
                    placeholder="Describe symptoms"
                    value={formData.currentSymptoms}
                    onChange={handleChange}
                ></textarea>

                <h3>Recent Tests</h3>
                {formData.recentTests.map((test, index) => (
                    <div key={index} className="test-entry">
                        <input
                            type="text"
                            name="testName"
                            placeholder="Test Name"
                            value={test.testName}
                            onChange={(e) => handleChange(e, index, "recentTests")}
                        />
                        <input
                            type="text"
                            placeholder="Month1"
                            value={test.testData[0]}
                            onChange={(e) => handleChange(e, index, "recentTests", 0)}
                        />
                        <input
                            type="text"
                            placeholder="Month2"
                            value={test.testData[1]}
                            onChange={(e) => handleChange(e, index, "recentTests", 1)}
                        />
                        <input
                            type="text"
                            placeholder="Month3"
                            value={test.testData[2]}
                            onChange={(e) => handleChange(e, index, "recentTests", 2)}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => addField("recentTests")}>
                    Add Test
                </button>

                <h3>Clinical Notes</h3>
                {formData.clinicalNotes.map((notes, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder="Enter clinical Notes"
                        value={notes}
                        onChange={(e) => handleChange(e, index, "clinicalNotes")}
                    />
                ))}
                <button type="button" onClick={() => addField("clinicalNotes")}>
                    Add Clinical Notes
                </button>

                <h3>Other Information</h3>
                <textarea
                    name="otherInfo"
                    placeholder="Other Information"
                    value={formData.otherInfo}
                    onChange={handleChange}
                ></textarea>

                <button className="submit-btn" type="submit">
                    Submit
                </button>
            </form>
            {loading && (
                <div className="loading" ref={loadingRef}>
                    <TailSpin
                        color="#007bff"
                        height={80}
                        width={80}
                    />
                </div>
            )}
            <div ref={resultSectionRef}>
                <ResultSection result={result} />
            </div>
        </div>
    );
};

export default PatientForm;