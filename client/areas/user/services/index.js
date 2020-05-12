import axios from 'axios';

export async function searchUsers(username) {
  const response = await axios.get('/api/search/users/' + username);
  return response.data.results.users;
}

export async function getOnlineUsers() {
  const response = await axios.get('/api/users?section=online');
  return response.data.users;
}
