import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateTweet from './pages/CreateTweet'
import MyTweets from './pages/MyTweets'
import SharedWithMe from './pages/SharedWithMe'
import ChangePassword from './pages/ChangePassword'
import TopNav from './components/TopNav'
import { useSelector } from 'react-redux'
import { RootState } from './store'

function Protected({ children }: { children: JSX.Element }) {
  const token = useSelector((s: RootState) => s.auth.token);
  if (!token) return <Navigate to="/login" replace />
  return children;
}

export default function App() {
  return (
    <>
      <TopNav />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Protected><Dashboard/></Protected>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/create" element={<Protected><CreateTweet/></Protected>} />
          <Route path="/my" element={<Protected><MyTweets/></Protected>} />
          <Route path="/shared" element={<Protected><SharedWithMe/></Protected>} />
          <Route path="/change-password" element={<Protected><ChangePassword/></Protected>} />
        </Routes>
      </div>
    </>
  )
}