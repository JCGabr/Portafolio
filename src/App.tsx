import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';
import Personal from './pages/Personal.tsx';
import Profesional from './pages/Professional.tsx';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/professional' element={<Profesional />}/>
        <Route path='/personal' element={<Personal />}/>
      </Routes>
    </>
  )
}

export default App
