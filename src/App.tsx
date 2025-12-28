import {Routes, Route, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Works from './pages/Works.tsx';
import { AnimatePresence } from 'motion/react';
import SocialMenu from './components/SocialMenu.tsx';
import AnimatedBackground from './components/AnimatedBackground.tsx';

function App() {

  const location = useLocation();
  const getBackgroundLevel = () => {
    switch(location.pathname) {
      case '/': return 1;
      case '/works': return 2;
      case '/about': return 3;
      default: return 1;
    }
  };
  
  return (
    <>
      <AnimatedBackground level={getBackgroundLevel()} />
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
