import axios from 'axios';

export function getUserData(userSlug) {
	return axios.get('/api/user/' + userSlug + '/edit').then(response => {
		return response.data;
	});
}
