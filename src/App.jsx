import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./page/Signin";
import Signup from "./page/Signup";
import Dashboard from "./page/Dashboard";
import SendMoney from "./page/SendMoney";

// Custom PrivateRoute component to handle authentication
const PrivateRoute = ({ element, path }) => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? element : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/send"
            element={<PrivateRoute element={<SendMoney />} />}
          />
          {/* Redirect root to signin if not logged in */}
          <Route
            path="/*"
            element={<Navigate to="/signin" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
