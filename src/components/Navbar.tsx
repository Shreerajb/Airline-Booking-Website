import React from "react";
import{Navbar, Nav, Container} from "react-bootstrap";

const AppNavbar: React.FC = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ps-5">
          <a className="navbar-brand ms-5" href="#">
            ✈️Akasa air
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active ms-5" aria-current="page" href="#">
                  Book
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link ms-5" href="#">
                  Manage Booking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link ms-5" href="#">
                  Check-in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link ms-5" href="#">
                  Add-ons
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link ms-5" href="#">
                  Offers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link ms-5" href="#">
                  Tarrif
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link ms-5" href="#">
                  Contact US
                </a>
              </li>
              <button type="button" className="btn btn-outline-success ms-5">Login</button>
            </ul>
          </div>
        </div>
      </nav>
    );
};

export default AppNavbar;