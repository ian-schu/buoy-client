/* eslint-disable arrow-body-style */
import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import 'preact/debug';
import { Haversine } from 'haversine-position';
import convert from 'convert-units';

import Header from '../components/header';
import BackgroundLayer from '../components/backgroundLayer';
import Main from '../routes/main';
import ValueFilters from '../routes/filters';
import Places from '../routes/places';
import Location from '../routes/location';
import Results from '../routes/results';
import Error from '../routes/error';
import allRecords from '../../data/enriched/loadableDB';
import { geocode } from '../apis/geocode';

export default class App extends Component {
	state = {
		allRecords,
		location: {
			data: {
				lat: null,
				lng: null,
				county: null,
				city: null,
				state: null,
				country: null
			},
			loading: false
		},
		filters: {
			localOwned: false,
			livingWage: false,
			recruitsVeterans: false,
			sustainable: false,
			womenOwned: false
		},
		placeType: 'food',
		results: {
			data: [],
			loading: false
		},
		searchPrefsChanged: false,
		configComplete: false
	};

	reduceFilters = filtersHash =>
		Object.entries(filtersHash).reduce((acc, curr) => {
			if (curr[1]) acc.push(curr[0]);
			return acc;
		}, []);

	getFullSearchResults() {
		this.setState({
			results: {
				data: [],
				loading: true
			}
		});

		const filtersArray = this.reduceFilters(this.state.filters);
		const placeType = this.state.placeType;

		const typeFiltered = this.state.allRecords.filter(record => {
			return record.type == placeType;
		});

		const valueFiltered = typeFiltered.filter(record => {
			return record.values.some(val => filtersArray.includes(val));
		});

		let coords = {
			lat: this.state.location.data.lat,
			lng: this.state.location.data.lng
		};
		const origin = new Haversine(coords);

		const distanceAdded = valueFiltered.map(record => {
			let distanceTo = origin.getDistance(record.location);
			record.distanceTo = convert(distanceTo)
				.from('m')
				.to('mi')
				.toFixed(1);
			return record;
		});

		const orderedByDistance = distanceAdded.sort((a, b) => {
			return a.distanceTo - b.distanceTo;
		});

		this.setState({
			results: {
				data: orderedByDistance,
				loading: false
			},
			searchPrefsChanged: false
		});
	}

	locationHandlers = {
		changeLocation: locationManifest => {
			this.setState({
				location: {
					data: {
						lat: locationManifest.lat,
						lng: locationManifest.lng,
						county: locationManifest.county || null,
						city: locationManifest.city || null,
						state: locationManifest.state || null,
						country: locationManifest.country || null
					},
					loading: false
				},
				searchPrefsChanged: true,
				configComplete: true
			});
			route('/results', true);
		},
		setLocationFromNavigator: positionObj => {
			// Receive basic coordinates
			let manifest = {
				lat: positionObj.coords.latitude,
				lng: positionObj.coords.longitude
			};

			// Lookup location details from coords
			geocode('latlng', `${manifest.lat},${manifest.lng}`).then(
				locationManifest => {
					console.log(locationManifest);
					this.locationHandlers.changeLocation(locationManifest);
				},
			);
		},
		setLocationLoading: () => {
			this.setState({
				location: {
					data: this.state.location.data,
					loading: true
				},
				searchPrefsChanged: true
			});
		}
	};

	setFilter = (filterName, value) => {
		this.setState({
			filters: {
				...this.state.filters,
				[filterName]: value
			},
			searchPrefsChanged: true
		});
	};

	setPlaceType = value => {
		this.setState({
			placeType: value,
			searchPrefsChanged: true
		});
	};

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	constructor() {
		super();
		this.getFullSearchResults = this.getFullSearchResults.bind(this);
		this.locationHandlers.changeLocation = this.locationHandlers.changeLocation.bind(
			this,
		);
	}

	render({}, { location, filters, placeType, results }) {
		return (
			<div id="app">
				<Header />
				<BackgroundLayer />
				<Router onChange={this.handleRoute}>
					<Main
						path="/"
						location={location}
						locationHandlers={this.locationHandlers}
					/>
					<ValueFilters
						path="/values"
						modal={this.state.configComplete}
						filters={filters}
						setFilter={this.setFilter}
						getResults={this.getFullSearchResults}
					/>
					<Places
						path="/places"
						modal={this.state.configComplete}
						placeType={placeType}
						setPlaceType={this.setPlaceType}
						getResults={this.getFullSearchResults}
					/>
					<Location
						path="/location"
						modal={this.state.configComplete}
						location={location}
						locationHandlers={this.locationHandlers}
					/>
					<Results
						configComplete={this.state.configComplete}
						path="/results"
						location={location}
						filters={filters}
						placeType={placeType}
						results={results}
						setFilter={this.setFilter}
						setPlaceType={this.setPlaceType}
						getResults={this.getFullSearchResults}
						searchPrefsChanged={this.state.searchPrefsChanged}
					/>
					<Error type="404" default />
				</Router>
				<div class="footer">
					<div class="footer__text">
						&copy; Buoy Navigation 2018. Built by Ian and Robert in Austin,
						Texas.
					</div>
				</div>
			</div>
		);
	}
}
