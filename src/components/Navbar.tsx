import React from "react";
import { Outlet } from "react-router-dom";

const AppNavbar: React.FC = () => {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid ps-5">
            <a className="navbar-brand ms-5 d-flex align-items-center" href="/">
              {/* ✈️Akasa air */}
              <img src="\Images\Akasa-Air-Neues-Logo.png" className="img-fluid" style={{ maxHeight:"100px",width:"auto"}} alt="akasa logo"></img> 
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
            <div className="collapse navbar-collapse flex-1 justify-content-end" id="navbarNav">
              <ul className="navbar-nav flex-1">
                <li className="nav-item d-flex justify-content-center">
                  <a className="nav-link active" aria-current="page" href="/">
                    Book
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Manage Booking
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Check-in
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Add-ons
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Offers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Tarrif
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Contact US
                  </a>
                </li>
                <li>
                <button type="button" className="btn btn-outline-warning ms-5">Login</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Outlet />
      </>
    );
};

export default AppNavbar;