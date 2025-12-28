import {Routes, Route, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Works from './pages/Works.tsx';
import { AnimatePresence } from 'motion/react';
import SocialMenu from './components/SocialMenu.tsx';

function App() {

  const location = useLocation();
  
  return (
    <>
      <NavBar />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />}/>
          <Route path='/works' element={<Works />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </AnimatePresence>
      <SocialMenu/>
    </>
  )
}

export default App
