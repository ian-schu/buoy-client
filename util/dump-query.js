const axios = require('axios');
const fs = require('fs');

axios
	.get('https://api.airtable.com/v0/appcqM5kpu31ZWD0f/Locations', {
		params: { api_key: 'key3sTuBkfw2XeXRt' }
	})
	.then(res => res.data.records)
	.then(data => {
		fs.writeFile('./data/dumps/latest.json', JSON.stringify(data, null, 2), err => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Results file written to ./data.json');
		});
	})
	.catch(err => console.log(err));
