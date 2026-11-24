import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import GlobalSearch from './components/GlobalSearch.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Skills from './pages/Skills.jsx'
import Projects from './pages/Projects.jsx'
import Education from './pages/Education.jsx'
import Certificates from './pages/Certificates.jsx'
import Cart from './pages/Cart.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import NotFound from './pages/NotFound.jsx'

import AdminLogin from './admin/AdminLogin.jsx'
import Dashboard from './admin/Dashboard.jsx'
import ProfileManagement from './admin/ProfileManagement.jsx'
import ProjectsManagement from './admin/ProjectsManagement.jsx'
import SkillsManagement from './admin/SkillsManagement.jsx'
import EducationManagement from './admin/EducationManagement.jsx'
import CertificatesManagement from './admin/CertificatesManagement.jsx'
import AchievementsManagement from './admin/AchievementsManagement.jsx'
import MessagesManagement from './admin/MessagesManagement.jsx'
import UsersManagement from './admin/UsersManagement.jsx'
import Settings from './admin/Settings.jsx'
import AdminLayout from './admin/AdminLayout.jsx'

function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <Footer />
      <BackToTop />
    </div>
  )
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  /* Global Ctrl/Cmd + K shortcut */
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header onSearchOpen={() => setSearchOpen(true)} />}

      <div key={location.pathname} className="animate-fade-up">
        <Routes>
          {/* ---------- Public ---------- */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />
          <Route
            path="/skills"
            element={
              <PublicLayout>
                <Skills />
              </PublicLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <PublicLayout>
                <Projects />
              </PublicLayout>
            }
          />
          <Route
            path="/education"
            element={
              <PublicLayout>
                <Education />
              </PublicLayout>
            }
          />
          <Route
            path="/certificates"
            element={
              <PublicLayout>
                <Certificates />
              </PublicLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <PublicLayout>
                <Cart />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ---------- Admin ---------- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ProfileManagement />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="skills" element={<SkillsManagement />} />
            <Route path="education" element={<EducationManagement />} />
            <Route path="certificates" element={<CertificatesManagement />} />
            <Route path="achievements" element={<AchievementsManagement />} />
            <Route path="messages" element={<MessagesManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="*"
            element={
              <PublicLayout>
                <NotFound />
              </PublicLayout>
            }
          />
        </Routes>
      </div>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
