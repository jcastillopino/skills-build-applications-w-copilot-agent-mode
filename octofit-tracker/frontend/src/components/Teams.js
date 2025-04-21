import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://solid-xylophone-p7w6xq49r5c5rr-8000.app.github.dev/api-root/teams/')
      .then(response => response.json())
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">Loading teams data</div>
    );
  }

  return (
    <div>
      <h1 className="text-center">Teams</h1>
      
      {teams.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No teams available at the moment.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {teams.map(team => (
            <div className="col" key={team._id}>
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Members:</strong> {team.members ? team.members.length : 0}
                  </p>
                  <button className="btn btn-primary" aria-label={`View team ${team.name} details`}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
