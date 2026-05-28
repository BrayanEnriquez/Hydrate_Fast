
import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import CultivosPage from './pages/CultivosPage'
import CreateCropPage from './pages/CreateCropPage'
import DashboardPage from './pages/DashboardPage'
import AlertasPage from './pages/AlertasPage'



function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/cultivos" element={<CultivosPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/alertas" element={<AlertasPage />} />
      <Route path="/cultivos/nuevo" element={<CreateCropPage />} />
      <Route path="/about" element={<h1 className="text-2xl font-bold">Página Acerca de</h1>} />
    </Routes>
  )
}

export default App
