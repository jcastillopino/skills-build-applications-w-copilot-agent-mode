// API configuration for the OctoFit Tracker application
const API_BASE_URL = window.location.hostname.includes('github.dev') 
  ? `https://${window.location.hostname.replace('3000', '8000')}`
  : 'http://localhost:8000';

export const API_ENDPOINTS = {
  activities: `${API_BASE_URL}/api-root/activities/`,
  leaderboard: `${API_BASE_URL}/api-root/leaderboard/`,
  teams: `${API_BASE_URL}/api-root/teams/`,
  users: `${API_BASE_URL}/api-root/users/`,
  workouts: `${API_BASE_URL}/api-root/workouts/`,
  getUser: (userId) => `${API_BASE_URL}/api-root/users/${userId}/`
};

export default API_ENDPOINTS;
