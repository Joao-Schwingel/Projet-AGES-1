import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'contexts/Auth/RequireAuth';

import Login from 'pages/login';
import Home from 'pages/home';
import HomeAdmin from 'pages/homeAdmin';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <HomeAdmin />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
