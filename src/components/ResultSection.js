import React, { useEffect, useState } from "react";
import ProgressBar from './ProgressBar'; // Ensure the path is correct
import "./ResultSection.css";

const ResultSection = ({ result }) => {
    const [highRiskResults, setHighRiskResults] = useState([]);
    const [lowRiskResults, setLowRiskResults] = useState([]);

    useEffect(() => {
        if (result) {
            const highRisk = [];
            const lowRisk = [];

            Object.entries(result).forEach(([disease, data]) => {
                const [percentage, reason] = data.split(":");
                const parsedPercentage = parseInt(percentage); // Ensure the percentage is parsed as a number
                console.log("data for circular bar " + parsedPercentage + " disease: " + disease);
                const resultElement = (
                    <div key={disease} className="result-box">
                        <div className="result-box-content">
                            <h3>{disease}</h3>
                            <div className="progress-bar">
                                <ProgressBar
                                    percentage={parsedPercentage}
                                   
                                    strokeWidth={10} // You can adjust the strokeWidth as needed
                                />
                            </div>
                            {parsedPercentage > 50 && reason && (
                                <p className="reason">Reason: {reason}</p>
                            )}
                        </div>
                    </div>
                );

                if (parsedPercentage > 50) {
                    highRisk.push(resultElement);
                } else {
                    lowRisk.push(resultElement);
                }
            });

            setHighRiskResults(highRisk);
            setLowRiskResults(lowRisk);
        }
    }, [result]);

    return (
        <div className="result-section" id="result-section">
            <h2>Result</h2>
            <div className="result-content">
                {highRiskResults.length > 0 && (
                    <div className="result-subsection">
                        <h3>High Risk (More than 50%)</h3>
                        {highRiskResults}
                    </div>
                )}
                {lowRiskResults.length > 0 && (
                    <div className="result-subsection">
                        <h3>Low Risk (50% or less)</h3>
                        {lowRiskResults}
                    </div>
                )}
                {highRiskResults.length === 0 && lowRiskResults.length === 0 && (
                    <p>No result to display</p>
                )}
            </div>
        </div>
    );
};

export default ResultSection;