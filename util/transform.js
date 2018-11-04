/* eslint-disable no-console */
require('dotenv').config();
const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const axios = require('axios');
const fs = require('fs-extra');

const addressMapper = {
	route: 'street',
	street_number: 'streetNumber',
	administrative_area_level_2: 'county',
	administrative_area_level_1: 'state',
	postal_code: 'zip'
};

const rawRecords = fs.readJsonSync('./data/dumps/latest.json');
const flattenedRecords = rawRecords.map(el => el.fields);
const cleanedRecords = flattenedRecords.filter(el => el['Google-ID'] != undefined);
const compactRecords = cleanedRecords.map(el => ({
	name: el['Location-name'],
	type: el['Location-type'],
	values: el.Values,
	placeId: el['Google-ID']
}));

const getPlaceDetails = compactRecord => {
	console.log(`Requesting payload for '${compactRecord.name}'`);
	const promise = axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
		params: {
			key: apiKey,
			placeid: compactRecord.placeId
		}
	});

	return promise;
};

const enrichRecord = compactRecord => {
	let placeDetails = getPlaceDetails(compactRecord);

	return placeDetails
		.then(res => res.data)
		.then(data => {
			if (data.result) {
				let details = data.result;
				console.log(`Transforming payload for '${details.name}'`);

				let enrichedRecord = {
					name: details.name,
					type: compactRecord.type,
					values: compactRecord.values,
					location: details.geometry.location,
					placeid: compactRecord.placeId,
					googleTypes: details.types,
					street: details.address_components.reduce((acc, curr) => {
						let key = addressMapper[curr.types[0]] || curr.types[0];
						acc[key] = curr.short_name;
						return acc;
					}, {}),
					mapsUrl: details.url,
					website: details.website
				};

				return enrichedRecord;
			}
		})
		.catch(err => {
			console.log(err);
		});
};

let enrichedRecords = compactRecords.map(record => enrichRecord(record));

Promise.all(enrichedRecords)
	.then(enrichedData => {
		fs.writeJsonSync('./data/enriched/latestDB.json', enrichedData, { spaces: 2 });
		console.log('Output written to ./data/enriched/latestDB.json');
	})
	.catch(err => console.log(err));
