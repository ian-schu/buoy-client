/* eslint-disable arrow-body-style */
import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import 'preact/debug';

import Header from '../components/header';
import Main from '../routes/main';
import ValueFilters from '../routes/filters';
import Places from '../routes/places';
import Results from '../routes/results';
import allRecords from '../../data/enriched/loadableDB';

export default class App extends Component {
	state = {
		allRecords,
		location: {
			data: {},
			loading: false
		},
		filters: {
			localOwned: true,
			livingWage: true,
			recruitsVeterans: true,
			sustainable: true,
			womenOwned: true
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

		this.setState({
			results: {
				data: valueFiltered,
				loading: false
			}
		});
	}

	locationHandlers = {
		setLocation: positionObj => {
			this.setState({ location: positionObj });
			if (this.state.location) {
				console.log(`Location set as: 
					${this.state.location.coords.latitude}, ${this.state.location.coords.longitude}`);
				this.locationHandlers.clearLocationLoading();
				route('/values', true);
			}
		},
		setLocationLoading: () => {
			this.setState({
				location: {
					data: {},
					loading: true
				}
			});
		},
		clearLocationLoading: () => {
			this.setState({
				location: {
					data: this.state.location.data,
					loading: false
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

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	constructor() {
		super();
		this.getFullSearchResults = this.getFullSearchResults.bind(this);
	}

	render({}, { location, filters, placeType, results }) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Main path="/" location={location} locationHandlers={this.locationHandlers} />
					<ValueFilters path="/values" modal={false} filters={filters} setFilter={this.setFilter} />
					<Places
						path="/places"
						modal={false}
						placeType={placeType}
						setPlaceType={this.setPlaceType}
					/>
					<Results
						path="/results"
						location={location}
						filters={filters}
						placeType={placeType}
						results={results}
						setLocation={this.setLocation}
						setFilter={this.setFilter}
						setPlaceType={this.setPlaceType}
						getResults={this.getFullSearchResults}
					/>
				</Router>
			</div>
		);
	}
}
