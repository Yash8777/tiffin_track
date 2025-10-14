import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Splash from './components/Splash';
import RoleSelection from './components/RoleSelection';
import Login from './components/Login';
import Register from './components/Register';
import VendorDashboard from './components/VendorDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type Page = 'splash' | 'role-selection' | 'login' | 'register' | 'vendor-dashboard' | 'customer-dashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [selectedRole, setSelectedRole] = useState<'vendor' | 'customer' | null>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      if (user.role === 'VENDOR') {
        setCurrentPage('vendor-dashboard');
      } else {
        setCurrentPage('customer-dashboard');
      }
    }
  }, [user]);

  const handleRoleSelect = (role: 'vendor' | 'customer') => {
    setSelectedRole(role);
    setCurrentPage('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'splash':
        return <Splash onComplete={() => setCurrentPage('role-selection')} />;
      case 'role-selection':
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
      case 'login':
        return (
          <Login
            role={selectedRole}
            onRegisterClick={() => setCurrentPage('register')}
          />
        );
      case 'register':
        return (
          <Register
            role={selectedRole}
            onLoginClick={() => setCurrentPage('login')}
          />
        );
      case 'vendor-dashboard':
        return <VendorDashboard onLogout={logout} />;
      case 'customer-dashboard':
        return <CustomerDashboard onLogout={logout} />;
      default:
        return <Splash onComplete={() => setCurrentPage('role-selection')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;