// src/App.tsx
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import EventPage from './components/EventPage';
import { Toaster } from 'react-hot-toast';
import UserInfo from './components/UserInfo';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/"
            element={<EventPage />}
          />
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;