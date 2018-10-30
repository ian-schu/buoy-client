import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import axios from 'axios';

import Header from '../components/header';
import Main from '../routes/main';
import ValueFilters from '../routes/filters';
import Places from '../routes/places';
import Results from '../routes/results';

export default class App extends Component {
	state = {
		location: {},
		filters: {
			localOwned: true,
			livingWage: true,
			recruitsVeterans: true,
			sustainable: true,
			womenOwned: true
		},
		placeType: 'food',
		results: [],
		resultsLoading: false
	};

	getFullSearchResults = () => {
		axios
			.get('https://api.airtable.com/v0/appcqM5kpu31ZWD0f/Locations', {
				params: {
					api_key: 'key3sTuBkfw2XeXRt'
				}
			})
			.then(res => {
				this.setState({ results: res.data.records, resultsLoading: false });
			})
			.catch(err => {
				console.log(err);
			});
	};

	setLocation = positionObj => {
		this.setState({ location: positionObj });
		if (this.state.location) {
			console.log(`Location set as: 
${this.state.location.coords.latitude}, ${
				this.state.location.coords.longitude
			}`);
			route('/values', true);
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

	render({}, { location, filters, placeType, results, resultsLoading }) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Main path="/" location={location} setLocation={this.setLocation} />
					<ValueFilters
						path="/values"
						modal={false}
						filters={filters}
						setFilter={this.setFilter}
					/>
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
						resultsLoading={resultsLoading}
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
