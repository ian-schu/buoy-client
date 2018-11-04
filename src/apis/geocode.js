import axios from 'axios';

export const geocode = (type, inputString) => {
	console.log(`Requesting payload for '${inputString}'`);
	const promise = axios.get(
		'https://maps.googleapis.com/maps/api/geocode/json',
		{
			params: {
				key: 'AIzaSyDeFmj7tW3bSDYKe9ojsvQTN1j1mQM3L74',
				[type]: inputString
			}
		},
	);

	return promise
		.then(res => res.data)
		.then(data => {
			if (data.results.length) {
				return data.results[0];
			}

			throw new Error("Couldn't find this ZIP");
		})
		.then(data => {
			const lat = data.geometry.location.lat;
			const lng = data.geometry.location.lng;

			let county =
				data.address_components.find(comp => comp.types.includes('administrative_area_level_2'));
			county = county && county.short_name ? county.short_name : null;

			let city =
				data.address_components.find(comp => comp.types.includes('locality'));
			city = city && city.short_name ? city.short_name : null;

			let state =
				data.address_components.find(comp => comp.types.includes('administrative_area_level_1'));
			state = state && state.short_name ? state.short_name : null;

			let country =
				data.address_components.find(comp => comp.types.includes('country'));
			country = country && country.short_name ? country.short_name : null;

			return {
				lat,
				lng,
				county,
				city,
				state,
				country
			};
		})
		.catch(err => {
			console.log(err);
		});
};
