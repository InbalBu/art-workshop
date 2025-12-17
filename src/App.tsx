import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { AdminPage } from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<LandingPage />} />
        {/* Admin dashboard for managing sessions and registrations */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
