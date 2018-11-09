/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import 'preact/debug';
import { get, set } from 'idb-keyval/dist/idb-keyval-cjs';
import './style/global';

import Header from './components/header';
import BackgroundLayer from './components/backgroundLayer';
import Main from './routes/main';
import About from './routes/about';
import ValueFilters from './routes/filters';
import Places from './routes/places';
import Location from './routes/location';
import Results from './routes/results';
import Error from './routes/error';
import allRecords from '../data/enriched/loadableDB';
import { geocode } from './apis/geocode';

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
			'locally-owned': false,
			'living-wage': false,
			'recruits-veterans': false,
			sustainable: false,
			'women-owned': false
		},
		placeType: 'food',
		searchPrefsChanged: false,
		configComplete: false
	};

	locationHandlers = {
		changeLocation: locationManifest => {
			this.setState(prevState => ({
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
			}));
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
			this.setState(prevState => ({
				location: {
					data: prevState.location.data,
					loading: true
				},
				searchPrefsChanged: true
			}));
		}
	};

	resetPrefs() {
		this.setState(prevState => ({
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
				'locally-owned': false,
				'living-wage': false,
				'recruits-veterans': false,
				sustainable: false,
				'women-owned': false
			},
			placeType: 'food',
			searchPrefsChanged: false,
			configComplete: false
		}));
	}

	setFilter = (filterName, value) => {
		this.setState(prevState => ({
			filters: {
				...prevState.filters,
				[filterName]: value
			},
			searchPrefsChanged: true
		}));

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
		// if (e.router.base === undefined) {
		// 	route('/', true);
		// }
		// else {
		// 	this.currentUrl = e.url;
		// }
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
					this.setState(prevState => ({
						location: { data: locationData, loading: false }
					}));
				}
			})
			.catch(err => console.log('Error loading location data', err));

		let loadFilters = get('buoy_filters')
			.then(filters => {
				if (Object.values(filters).length) {
					this.setState(prevState => ({ filters }));
				}
			})
			.catch(err => console.log('Error loading filter data', err));

		let loadPlaceType = get('buoy_placeType')
			.then(placeType => {
				if (placeType) {
					this.setState(prevState => ({ placeType }));
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
				this.setState(prevState => ({
					configComplete: true,
					searchPrefsChanged: true
				}));
			}
		});
	}

	render({}, { location, filters, placeType, results, configComplete }) {
		return (
			<div id="app">
				<Header />
				<BackgroundLayer />
				<Router onChange={this.handleRoute.bind(this)}>
					<Main
						path="/"
						location={location}
						configComplete={configComplete}
						resetPrefs={this.resetPrefs.bind(this)}
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
					<About path="/about" />
					<Error type="404" default />
				</Router>
				<div class="footer">
					<div class="footer__text">
						&copy; Buoy Navigation 2018.
						<img src="./assets/logo-red.svg" alt="Buoy logo" class="logo" />
						Built by{' '}
						<a
							href="http://www.ianschu.com/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Ian
						</a>{' '}
						and{' '}
						<a
							href="https://boler.work/"
							rel="noopener noreferrer"
							target="_blank"
						>
							Robert
						</a>{' '}
						in Austin, Texas.
					</div>
				</div>
			</div>
		);
	}
}
