import { NavLink } from "react-router-dom";

import '../css/NavBar.css'


function NavBar() {
    return (
    <nav className="navbar">
        <div className="navbar-links">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/details" className="nav-link">Psyche Details</NavLink>
            <NavLink to="/simulations" className="nav-link">Simulations</NavLink>
        </div>
    </nav>
    )
}

export default NavBar