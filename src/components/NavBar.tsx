import { NavLink } from 'react-router-dom';
import '../components_styles/NavBar.css'

function NavBar(){
    return (
        <nav className='navbar'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/professional'>Professional</NavLink>
          <NavLink to='/personal'>Personal</NavLink>
        </nav>
    );
}

export default NavBar