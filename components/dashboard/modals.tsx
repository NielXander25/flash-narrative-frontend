// Responsive Campaign Wizard Modal
// This component implements a 3-step wizard with a progress indicator, optimized for mobile devices and featuring scrollable content along with dynamic step navigation.

import React, { useState } from 'react';
import './CampaignWizardModal.css'; // Assuming you have some CSS for styling

const CampaignWizardModal = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        { title: 'Step 1', content: 'Content for Step 1 here...' },
        { title: 'Step 2', content: 'Content for Step 2 here...' },
        { title: 'Step 3', content: 'Content for Step 3 here...' },
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="campaign-wizard-modal">
            <h2>{steps[currentStep].title}</h2>
            <div className="content">
                {steps[currentStep].content}
            </div>
            <div className="progress-indicator">
                {steps.map((step, index) => (
                    <div key={index} className={`indicator ${index === currentStep ? 'active' : ''}`}></div>
                ))}
            </div>
            <div className="navigation">
                <button onClick={prevStep} disabled={currentStep === 0}>Previous</button>
                <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</button>
            </div>
        </div>
    );
};

export default CampaignWizardModal;