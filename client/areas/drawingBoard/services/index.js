import axios from 'axios';

export async function getOnlineUsers() {
  const response = await axios.get('/api/users?section=online');
  return response.data.users;
}
