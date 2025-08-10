
import { useSelector } from 'react-redux'
import './App.css'
import type { RootState } from './redux/store'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoutes';
import TodoDetails from './pages/TodoDetails';
import InvitePage from './pages/InvitePage';



function App() {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todos" element={<ProtectedRoute allowedRoles={["admin", "invited", "user"]} ><TodoDetails /></ProtectedRoute>} />
        <Route path="/invite" element={<ProtectedRoute allowedRoles={["admin", "invited"]}><InvitePage
        /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={token ? "/todos" : "/login"} />} />
        {/* <Route path="/users" element={<ProtectedRoute allowedRoles={["admin"]}><UserPage/></ProtectedRoute>}/> */}
      </Routes>
    </Router>
  )
}

export default App

