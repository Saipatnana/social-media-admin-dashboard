import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UsersListingPage from "./components/UsersListingPage";
import PostsListingPage from "./components/PostsListingPage";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import AppLayout from "./components/AppLayout";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="/dash" element={<Layout />}>
              <Route
                index
                element={
                  <Dashboard
                  />
                }
              />
              <Route path="users" element={<UsersListingPage />} />
              <Route path="posts" element={<PostsListingPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
