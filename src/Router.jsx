import React from 'react';
import Login from './pages/Login';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import { Navigate, Route, BrowserRouter as Router, Routes, Outlet } from 'react-router-dom';
import Products from './pages/Products';
import Template from './ui/Template';

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Template> <Outlet /> </Template>;
};

const AppRouter = () => {
  const {user, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
