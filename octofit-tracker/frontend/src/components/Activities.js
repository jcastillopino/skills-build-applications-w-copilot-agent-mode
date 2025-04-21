import React, { useEffect, useState } from 'react';
import API_ENDPOINTS from '../config';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.activities)
      .then(response => response.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setLoading(false);
      });
  }, []);

  // Format duration from seconds to a readable format (hours and minutes)
  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  if (loading) {
    return <div className="loading">Loading activities data</div>;
  }

  return (
    <div>
      <h1 className="text-center">Activities</h1>
      
      {activities.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No activities available at the moment.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Activity Type</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity._id}>
                  <td>
                    <span className="fw-medium">{activity.activity_type}</span>
                  </td>
                  <td>{formatDuration(activity.duration_seconds)}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary me-2"
                      aria-label={`View details for ${activity.activity_type}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
