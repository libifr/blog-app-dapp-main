import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PostDetails from "./pages/PostDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPosts from "./pages/admin/Posts";
import CreatePost from "./pages/admin/CreatePost";
import EditPost from "./pages/admin/EditPost";
import ViewPost from "./pages/admin/ViewPost";
import AdminComments from "./pages/admin/Comments";
import AdminUsers from "./pages/admin/Users";
import EditUser from "./pages/admin/EditUser";
import Profile from "./pages/Profile";
import AdminLayout from "./components/admin/Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Layout>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Layout>
          }
        />
        <Route
          path="/registration"
          element={
            <Layout>
              <PublicRoute>
                <Registration />
              </PublicRoute>
            </Layout>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <Layout>
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin", "Author"]}>
                <AdminDashboard />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/posts"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin", "Author"]}>
                <AdminPosts />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/posts/create"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin", "Author"]}>
                <CreatePost />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/posts/:id/edit"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin", "Author"]}>
                <EditPost />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/posts/:id/view"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin"]}>
                <ViewPost />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/comments"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin"]}>
                <AdminComments />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users/:id/edit"
          element={
            <AdminLayout>
              <ProtectedRoute role={["Admin"]}>
                <EditUser />
              </ProtectedRoute>
            </AdminLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/404"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
