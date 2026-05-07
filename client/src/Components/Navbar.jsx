import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg app-navbar">
        <div className="container">
          <Link to="/" className="navbar-brand">Exercise Tracker</Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Exercises</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">New Exercise</Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">New User</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}