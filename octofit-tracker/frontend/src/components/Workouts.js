import React, { useEffect, useState } from 'react';
import API_ENDPOINTS from '../config';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.workouts)
      .then(response => response.json())
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setLoading(false);
      });
  }, []);

  // Function to truncate long descriptions
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (loading) {
    return <div className="loading">Loading workouts data</div>;
  }

  return (
    <div>
      <h1 className="text-center">Workouts</h1>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No workouts available at the moment.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {workouts.map(workout => (
            <div className="col" key={workout._id}>
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{workout.name || 'Unnamed Workout'}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{truncateText(workout.description)}</p>
                </div>
                <div className="card-footer bg-transparent d-flex justify-content-between">
                  <button 
                    className="btn btn-primary" 
                    aria-label={`Start workout: ${workout.name || 'Unnamed Workout'}`}
                  >
                    Start Workout
                  </button>
                  <button 
                    className="btn btn-outline-secondary"
                    aria-label={`View details for ${workout.name || 'Unnamed Workout'}`}
                  >
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

export default Workouts;
