import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from 'contexts/Auth/RequireAuth';
import { LoginPage } from 'pages/Login/login';
import { HomePage } from 'pages/home';
import { AdminRequestsPage } from 'pages/Admin/Requests/requests';
import { InstitutionRequestsReceivedPage } from 'pages/Institution/RequestsReceived/requestsReceived';
import { InstitutionRequestsSentPage } from 'pages/Institution/RequestsSent/requestsSent';
import { AdminHomePage } from 'pages/Admin/Home/home';
import { InstitutionHomePage } from 'pages/Institution/Home/home';
import { ROUTES } from './constants';
import { AdminTransportsPage } from 'pages/Admin/Transports/transports';
import { AdminMedicamentsPage } from 'pages/Admin/Medicaments/medicaments';
import { AdminInstitutionsPage } from 'pages/Admin/Institutions/institutions';
import { CreateRequestPage } from 'pages/Institution/CreateRequest/createRequest';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path={ROUTES.LOGIN()} element={<LoginPage />} />
        <Route path={ROUTES.HOME()} element={<HomePage />} />
        <Route
          path={ROUTES.ADMIN()}
          element={
            <RequireAuth>
              <AdminHomePage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ADMIN_REQUESTS()}
          element={
            <RequireAuth>
              <AdminRequestsPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ADMIN_INSTITUTIONS()}
          element={
            <RequireAuth>
              <AdminInstitutionsPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ADMIN_MEDICAMENTS()}
          element={
            <RequireAuth>
              <AdminMedicamentsPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ADMIN_TRANSPORTS()}
          element={
            <RequireAuth>
              <AdminTransportsPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.INSTITUTION()}
          element={
            <RequireAuth>
              <InstitutionHomePage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.INSTITUTION_REQUESTS_RECEIVED()}
          element={
            <RequireAuth>
              <InstitutionRequestsReceivedPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.INSTITUTION_REQUESTS_SENT()}
          element={
            <RequireAuth>
              <InstitutionRequestsSentPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.INSTITUTION_CREATE_REQUEST()}
          element={
            <RequireAuth>
              <CreateRequestPage />
            </RequireAuth>
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
