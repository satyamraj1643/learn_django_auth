import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Activate from "./containers/Activate";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Signup from "./containers/Signup";
import Layout from "./hocs/Layout";
import CheckEmail from "./containers/CheckEmail";
import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/check-email"
            element={
              <PublicRoute>
                <CheckEmail />
              </PublicRoute>
            }
          />
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={
              <PublicRoute>
                <ResetPasswordConfirm />
              </PublicRoute>
            }
          />
          <Route
            path="/activate/:uid/:token"
            element={
              <PublicRoute>
                <Activate />
              </PublicRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
