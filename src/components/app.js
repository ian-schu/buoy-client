/* eslint-disable arrow-body-style */
import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import 'preact/debug';
import { Haversine } from 'haversine-position';
import convert from 'convert-units';

import Header from '../components/header';
import Main from '../routes/main';
import ValueFilters from '../routes/filters';
import Places from '../routes/places';
import Location from '../routes/location';
import Results from '../routes/results';
import allRecords from '../../data/enriched/loadableDB';

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
		}
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
			lng: this.state.location.data.lng,
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
			}
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
				}
			});
		},
		setLocationFromNavigator: positionObj => {
			let manifest = {
				lat: positionObj.coords.latitude,
				lng: positionObj.coords.longitude
			};
			this.locationHandlers.changeLocation(manifest);
		},
		setLocationFromGeocode: positionObj => {
			this.setState({
				location: {
					data: {
						lat: positionObj.lat,
						lng: positionObj.lng
					},
					loading: false
				}
			});
			route('/values', true);
		},
		setLocationLoading: () => {
			this.setState({
				location: {
					data: this.state.location.data,
					loading: true
				}
			});
		}
	};

	setFilter = (filterName, value) => {
		this.setState({
			filters: {
				...this.state.filters,
				[filterName]: value
			}
		});
	};

	setPlaceType = value => {
		this.setState({ placeType: value });
	};

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	hasResults = () => this.state.results.data.length > 0;

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
				<Router onChange={this.handleRoute}>
					<Main
						path="/"
						location={location}
						locationHandlers={this.locationHandlers}
					/>
					<ValueFilters
						path="/values"
						modal={this.hasResults()}
						filters={filters}
						setFilter={this.setFilter}
					/>
					<Places
						path="/places"
						modal={this.hasResults()}
						placeType={placeType}
						setPlaceType={this.setPlaceType}
					/>
					<Location
						path="/location"
						modal={this.hasResults()}
						location={location}
						locationHandlers={this.locationHandlers}
					/>
					<Results
						path="/results"
						location={location}
						filters={filters}
						placeType={placeType}
						results={results}
						setFilter={this.setFilter}
						setPlaceType={this.setPlaceType}
						getResults={this.getFullSearchResults}
					/>
				</Router>
			</div>
		);
	}
}
