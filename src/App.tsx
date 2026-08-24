import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Route>

        {/* Future Dashboard Route */}
        <Route path="/dashboard" element={
          <div style={{ padding: '4rem', textAlign: 'center', fontFamily: 'var(--font-primary)', color: 'var(--color-dark)' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Dashboard</h1>
            <p>Welcome to your Flocka dashboard.</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
