import axios from 'axios';

const API_KEY = '1mKMu1bt4aznF4ZjzXjrQOEz5QszJ7AgO-dqTkznX5s';
axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
orientation: 'landscape',
per_page: 15,
};

export const getPhotos = async (query, page) => {
const { data } = await axios.get('/search/photos', {
params: {
query,
page,
},
});

return data;
};