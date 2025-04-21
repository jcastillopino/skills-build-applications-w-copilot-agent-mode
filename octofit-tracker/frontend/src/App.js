import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';
import logo from './octofitapp-small.png';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              <img src={logo} alt="OctoFit Logo" className="App-logo" aria-hidden="true" />
              <NavLink className="navbar-brand" to="/">OctoFit Tracker</NavLink>
            </div>
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
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container mt-4">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="text-center py-5">
                <h1 className="display-4 fw-bold">Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your activities, join teams, and compete on the leaderboard!</p>
                <div className="mt-4">
                  <NavLink to="/activities" className="btn btn-primary me-2">View Activities</NavLink>
                  <NavLink to="/teams" className="btn btn-accent">Join a Team</NavLink>
                </div>
              </div>
            } />
          </Routes>
        </main>
        <footer className="container-fluid text-center py-3 mt-5 bg-light">
          <p className="text-muted mb-0">© {new Date().getFullYear()} OctoFit Tracker - Mergington High School</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
