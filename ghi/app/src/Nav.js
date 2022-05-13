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
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Inventory
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/manufacturers">Manufacturers</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/manufacturers/new">Add Manufacturer</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/models">Models</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/models/new">Add Model</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/automobiles">Automobiles</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/automobiles/new">Add Automobile</NavLink>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Service
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/service/new">Schedule Service</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/service/history">Service History</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/technicians">Technicians</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/technicians/new">Enter a Technician</NavLink>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sales
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/salespersons">Add a Salesperson</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/customers">Add a Customer</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <NavLink className="text-dark nav-link" to="/salerecords">Add a Sale</NavLink>
              </a>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/service">Service Appointments</NavLink>
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
              <NavLink className="nav-link" to="/service">Service Appointments</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/service/new">Schedule Service</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/salespersons">Add a Salesperson</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/salespersons/history">Salesperson History</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/customers">Add a Customer</NavLink>
          </li>
          <li className="nav-item">
              <NavLink className="nav-link" to="/service/history">Service History</NavLink>
          </li>
          <li>
              <NavLink className="nav-link" to="/salerecords">Sale Records</NavLink>
          </li>
          <li>
              <NavLink className="nav-link" to="/salerecords/new">Add a Sale</NavLink>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
