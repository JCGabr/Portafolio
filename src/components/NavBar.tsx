import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import '../components_styles/NavBar.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/professional', label: 'Professional' },
  { path: '/personal', label: 'Personal' },
]

const animationStart = {
  initial:"initial",
  whileHover:"hover",
  whileTap:{ scale: 0.95 },
  variants:{
    initial: {},
    hover: { x: 6, scale: 1.1 }
  }
}

const animationEnd = {
  variants: {
    initial: { scaleX: 0 },
    hover: { scaleX: 1 }
  },
  transition:{ duration: 0.4, ease: 'easeOut' as const}
}

function NavBar() {
  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <motion.div
          key={item.path}
          {...animationStart}
        >
          <motion.div
            className="underline-top"
            {...animationEnd}
          />
          
          <NavLink to={item.path} className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>{item.label}</NavLink>
          
          <motion.div
            className="underline-bottom"
            {...animationEnd}
          />
        </motion.div>
      ))}
    </nav>
  )
}

export default NavBar