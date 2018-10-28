import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Header from '../components/header';
import Main from '../routes/main';
import ValueFilters from '../routes/filters';
import Places from '../routes/places';

export default class App extends Component {
	state = {
		location: {},
		filters: {},
		placeType: ''
	}

	setLocation = positionObj => {
		this.setState({ location: positionObj });
		if (this.state.location) {
			console.log(`Location set as: 
${this.state.location.coords.latitude}, ${this.state.location.coords.longitude}`);
			route('/values', true);
		}
	};

	setFilter = (filterName, value) => {
		this.setState({ filters:
			{ ...this.state.filters,
				[filterName]: value }
		});
	}

	setPlaceType = value => {
		this.setState({ placeType: value });
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render({},{ location, filters, placeType }) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Main path="/"
						location={location}
						setLocation={this.setLocation}
					/>
					<ValueFilters path="/values"
						modal={false}
						filters={filters}
						setGlobalFilter={this.setFilter}
					/>
					<Places path="/places"
						modal={false}
						placeType={placeType}
						setGlobalPlaceType={this.setPlaceType}
					/>
				</Router>
			</div>
		);
	}
}
