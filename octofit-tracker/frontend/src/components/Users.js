import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://solid-xylophone-p7w6xq49r5c5rr-8000.app.github.dev/api/users/')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading users data</div>;
  }

  return (
    <div>
      <h1 className="text-center">Users</h1>
      
      {users.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No users available at the moment.
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="h5 mb-0">Registered Users</h2>
              <span className="badge bg-light text-dark">{users.length} total</span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered mb-0">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-circle me-2" aria-hidden="true">
                          {user.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <span className="fw-medium">{user.username}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-primary me-2"
                        aria-label={`View profile for ${user.username}`}
                      >
                        Profile
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        aria-label={`View activities for ${user.username}`}
                      >
                        Activities
                      </button>
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

export default Users;
