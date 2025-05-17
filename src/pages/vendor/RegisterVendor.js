import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import RegisterFormVendor from '../../components/RegisterFormVendor';
import Upload from '../../components/Upload';
import SocVendor from '../../components/SocVendor';
import RegisterSuccessVendor from '../../components/RegisterSuccessVendor';

const RegisterVendor = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        selfiePhoto: '',
        role: 'vendor',
        company: ''
    });

    const navigate = useNavigate();
    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    
    const handleSubmit = async () => {
        const data = new FormData();
        
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Registration successful:', response.data);
            nextStep();
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleFinish = () => {
        navigate('/vendor/login');
    };

    return (
        <div>
            {currentStep === 1 && (
                <RegisterFormVendor 
                    onNext={nextStep} 
                    formData={formData} 
                    setFormData={setFormData} 
                />
            )}
            {currentStep === 2 && (
                <Upload 
                    onNext={nextStep} 
                    onBack={prevStep} 
                    formData={formData} 
                    setFormData={setFormData} 
                />
            )}
            {currentStep === 3 && (
                <SocVendor
                    onSubmit={handleSubmit} 
                    onBack={prevStep} 
                />
            )}
            {currentStep === 4 && (
                <RegisterSuccessVendor
                    onFinish={handleFinish} 
                />
            )}
        </div>
    );
};

export default RegisterVendor;