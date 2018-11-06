/* eslint-disable arrow-body-style */
import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import 'preact/debug';
import { get, set } from 'idb-keyval/dist/idb-keyval-cjs';

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
		searchPrefsChanged: false,
		configComplete: false
	};

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
			set('buoy_location_data', this.state.location.data)
				.then(() => console.log('Location data saved locally'))
				.catch(err => console.log('Setting location data failed', err));

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

		set('buoy_filters', this.state.filters)
			.then(() => console.log('Filter data saved locally'))
			.catch(err => console.log('Setting filter data failed', err));
	};

	setPlaceType = value => {
		this.setState({
			placeType: value,
			searchPrefsChanged: true
		});

		set('buoy_placeType', this.state.placeType)
			.then(() => console.log('Place type saved locally'))
			.catch(err => console.log('Setting place type failed', err));
	};

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	constructor() {
		super();
		this.locationHandlers.changeLocation = this.locationHandlers.changeLocation.bind(
			this,
		);
	}

	componentDidMount() {
		let loadLocation = get('buoy_location_data')
			.then(locationData => {
				if (Object.values(locationData)) {
					this.setState({
						location: {
							data: locationData,
							loading: false
						}
					});
				}
			})
			.catch(err => console.log('Error loading location data', err));

		let loadFilters = get('buoy_filters')
			.then(filters => {
				if (Object.values(filters).length) {
					this.setState({
						filters
					});
				}
			})
			.catch(err => console.log('Error loading filter data', err));

		let loadPlaceType = get('buoy_placeType')
			.then(placeType => {
				if (placeType) {
					this.setState({
						placeType
					});
				}
			})
			.catch(err => console.log('Error loading placeType data', err));

		Promise.all([loadLocation, loadFilters, loadPlaceType]).then(() => {
			let conditions = [
				!!this.state.placeType,
				Object.values(this.state.filters).includes(true),
				!!this.state.location.data.lat,
				!!this.state.location.data.lng
			];
			if (conditions.every(el => el == true)) {
				this.setState({ configComplete: true, searchPrefsChanged: true });
				route('/results', true);
			}
		});
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
					/>
					<Places
						path="/places"
						modal={this.state.configComplete}
						placeType={placeType}
						setPlaceType={this.setPlaceType}
					/>
					<Location
						path="/location"
						modal={this.state.configComplete}
						location={location}
						locationHandlers={this.locationHandlers}
					/>
					<Results
						path="/results"
						allRecords={this.state.allRecords}
						configComplete={this.state.configComplete}
						location={location}
						filters={filters}
						placeType={placeType}
						searchPrefsChanged={this.state.searchPrefsChanged}
					/>
					<Error type="404" default />
				</Router>
				<div class="footer">
					<div class="footer__text">
						&copy; Buoy Navigation 2018.<br />Built by Ian and Robert in Austin,
						Texas.
					</div>
				</div>
			</div>
		);
	}
}
