import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import Header from '../components/header';
import Main from '../routes/main';
import Filters from '../routes/filters';

export default class App extends Component {
	state = {
		location: {},
		filters: {}
	}

	setLocation = positionObj => {
		this.setState({ location: positionObj });
		if (this.state.location) {
			route('/filters', true);
		}
	};

	setFilter = (filterName, value) => {
		this.setState({ filters:
			{ ...this.state.filters,
				[filterName]: value }
		});
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render({},{ location, filters }) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Main path="/"
						location={location}
						setLocation={this.setLocation}
					/>
					<Filters path="/filters"
						filters={filters}
						setGlobalFilter={this.setFilter}
					/>
					{/* <Filter path="/filter" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" /> */}
				</Router>
			</div>
		);
	}
}
