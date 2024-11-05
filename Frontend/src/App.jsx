import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth"; // Importamos el contexto de autenticación
import Register from "./Pages/Register";
import Finance from "./Pages/Finance";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import FinanceSurvey from "./Pages/FinanceSurvey";
import ProtectedRoute from "./routes/protectedRoute";

const AppRoutes = () => {
  const { isAuthenticated, surveyCompleted } = useAuth();

  return createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/financeIA" replace />,
    },
    {
      path: "/financeIA",
      element: <Finance />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "/financesurvey",
      element: isAuthenticated ? (
        !surveyCompleted ? (
          <ProtectedRoute>
            <FinanceSurvey />
          </ProtectedRoute>
        ) : (
          <Navigate to="/dashboard" replace />
        )
      ) : (
        <Navigate to="/login" replace />
      ),
    },
  ]);
};

const App = () => {
  return (
    <>
      <Toaster />
      <RouterProvider router={AppRoutes()} />
    </>
  );
};

export default App;
