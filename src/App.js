// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import PatientForm from "./components/PatientForm";
import ParticlesBackground from "./components/ParticlesBackground";
import "./App.css"; // Import CSS

function App() {
    return (
        <Router>
            <div className="App">
                <ParticlesBackground id = "particles"/>
                <Header />
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/patient-form" element={<PatientForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;