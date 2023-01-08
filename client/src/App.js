import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './contexts/PostContext';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<Auth authRoute="login" />} />
            <Route exact path="/register" element={<Auth authRoute="register" />} />
            <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard></Dashboard>}>
            </ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute children={<About></About>}>
            </ProtectedRoute>} />
          </Routes>
        </Router>
      </PostContextProvider>   
    </AuthContextProvider>

  );
}

export default App;
