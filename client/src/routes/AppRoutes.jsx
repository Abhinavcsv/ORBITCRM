import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Employees from "../pages/employees/Employees";
import Leads from "../pages/leads/Leads";
import MyLeads from "../pages/leads/MyLeads";
import Tasks from "../pages/tasks/Tasks";
import MyTasks from "../pages/tasks/MyTasks";
import Customers from "../pages/customers/Customers";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";
import Profile from "../pages/profile/Profile";

import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}

        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <AuthLayout>
              <ForgotPassword />
            </AuthLayout>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <AuthLayout>
              <VerifyOTP />
            </AuthLayout>
          }
        />

        <Route
          path="/reset-password"
          element={
            <AuthLayout>
              <ResetPassword />
            </AuthLayout>
          }
        />

        {/* Dashboard */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Employees />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/register-user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Register />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Leads />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Tasks />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Customers />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Reports />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Employee Routes */}

        <Route
          path="/my-leads"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <MainLayout>
                <MyLeads />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <MainLayout>
                <MyTasks />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;