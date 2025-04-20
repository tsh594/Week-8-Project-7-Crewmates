import { Routes, Route } from 'react-router-dom'
import CrewmatesList from './pages/CrewmatesList'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateDetail from './pages/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CrewmatesList />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/crewmate/:id" element={<CrewmateDetail />} />
        <Route path="/edit/:id" element={<EditCrewmate />} />
      </Routes>
    </Layout>
  )
}

export default App