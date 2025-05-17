import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';


import RegisterVendor from './pages/vendor/RegisterVendor';
import LoginVendor from './components/LoginVendor';
import UploadVendor from './components/Upload';
import SocVendor from './components/SocVendor';
import DashboardVendor from './components/DashboardVendor';
import UploadLetter from './components/UploadLetter';

import RegisterVisitor from './pages/visitor/RegisterVisitor';
import LoginVisitor from './components/LoginVisitor';
import UploadVisitor from './components/UploadVisitor';
import SocVisitor from './components/SocVisitor';
import DashboardVisitor from './components/DashboardVisitor';

import Admin from './components/Admin';

import CheckConfirmation from './components/CheckInConfirmation';


import { CheckInProvider } from './contexts/CheckInContext';
import LabProvider from './contexts/LabContext'; // Import LabProvider
import './index.css';

function App() {
  return (
    <CheckInProvider>
      <LabProvider>
        <Router>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/vendor/register" element={<RegisterVendor />} />
            <Route path="/vendor/login" element={<LoginVendor />} />
            <Route path="/vendor/upload" element={<UploadVendor />} />
            <Route path="/vendor/soc" element={<SocVendor />} />
            <Route path="/vendor/dashboard" element={<DashboardVendor />} />
            <Route path="/vendor/upload/letter" element={<UploadLetter />} />

            <Route path="/visitor/register" element={<RegisterVisitor />} />
            <Route path="/visitor/login" element={<LoginVisitor />} />
            <Route path="/visitor/upload" element={<UploadVisitor />} />
            <Route path="/visitor/soc" element={<SocVisitor />} />
            <Route path="/visitor/dashboard" element={<DashboardVisitor />} />

            <Route path="/Admin" element={<Admin />} />
            
            <Route path="/check-confirmation" element={<CheckConfirmation />} />


          </Routes>
        </Router>
      </LabProvider>
    </CheckInProvider>
  );
}

export default App;
