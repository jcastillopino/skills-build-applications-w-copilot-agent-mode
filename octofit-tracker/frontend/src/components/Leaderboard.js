import React, { useEffect, useState } from 'react';
import API_ENDPOINTS from '../config';

function Leaderboard() {
  const [leaderboardEntries, setLeaderboardEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch leaderboard data
    fetch(API_ENDPOINTS.leaderboard)
      .then(response => response.json())
      .then(async data => {
        // Create an array to store entries with user details
        const entriesWithUsers = await Promise.all(data.map(async entry => {
          // For each entry, fetch the user details
          try {
            const userResponse = await fetch(API_ENDPOINTS.getUser(entry.user));
            const userData = await userResponse.json();
            
            // Return the entry with user details
            return {
              ...entry,
              username: userData.username || 'Unknown User'
            };
          } catch (error) {
            console.error('Error fetching user data:', error);
            return {
              ...entry,
              username: 'Unknown User'
            };
          }
        }));
        
        // Sort entries by score (highest first)
        entriesWithUsers.sort((a, b) => b.score - a.score);
        setLeaderboardEntries(entriesWithUsers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading leaderboard data</div>;
  }

  // Function to determine the badge for top performers
  const getRankBadge = (index) => {
    if (index === 0) return <span className="badge bg-warning text-dark me-2">🥇 1st</span>;
    if (index === 1) return <span className="badge bg-secondary text-white me-2">🥈 2nd</span>;
    if (index === 2) return <span className="badge bg-danger text-white me-2">🥉 3rd</span>;
    return <span className="badge bg-light text-dark me-2">{index + 1}</span>;
  };

  return (
    <div>
      <h1 className="text-center">Leaderboard</h1>
      
      {leaderboardEntries.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No leaderboard data available at the moment.
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h2 className="h5 mb-0">Top Performers</h2>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered mb-0">
              <thead className="table-primary">
                <tr>
                  <th style={{width: "10%"}} scope="col">Rank</th>
                  <th style={{width: "50%"}} scope="col">Username</th>
                  <th style={{width: "40%"}} scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardEntries.map((entry, index) => (
                  <tr key={entry._id} className={index < 3 ? "table-active" : ""}>
                    <td>
                      {getRankBadge(index)}
                    </td>
                    <td className="fw-medium">{entry.username}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="progress flex-grow-1 me-2" style={{height: "10px"}}>
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{width: `${(entry.score / leaderboardEntries[0].score) * 100}%`}} 
                            aria-valuenow={entry.score} 
                            aria-valuemin="0" 
                            aria-valuemax={leaderboardEntries[0].score}
                          ></div>
                        </div>
                        <span className="fw-bold">{entry.score}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
