import axios from 'axios';
import { clientToServer } from '../lookups/values';

const { SERVER_URL } = process.env;

const defaultSearchPrefs = {
	type: 'food',
	values: ['local_owned', 'sustainable'],
	origin: {
		lat: 30.3793534,
		lng: -97.708131
	}
};

export const getPlaces = (searchPrefs = defaultSearchPrefs) => {
	const promise = axios.post(
		`${SERVER_URL}/places`,
		cleanPostBody(searchPrefs)
	);

	return promise
		.then(res => res.data)
		.catch(err => {
			console.error(err);
		});
};

const cleanPostBody = searchPrefs => {
	let cleaned = Object.assign(searchPrefs);
	cleaned.values = searchPrefs.values.map(el => clientToServer.get(el));
	return cleaned;
};