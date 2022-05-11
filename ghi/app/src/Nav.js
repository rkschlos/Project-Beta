import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/new">Add Manufacturer</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/models">Models</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/models/new">Add Model</NavLink>
          </li>
          <li>
              <NavLink className="nav-link" to="/automobiles">Automobiles</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/new">Add Automobile</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/technicians">Technicians</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/technicians/new">Enter a Technician</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/salespersons">Add a Salesperson</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/customers">Add a Customer</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
