import { Component } from 'preact';
import SearchResult from '../components/searchResult';
import ValueIcon from '../components/valueIcon';

import { Haversine } from 'haversine-position';
import convert from 'convert-units';

export default class Results extends Component {
	state = {
		location: this.props.location.data,
		filters: this.props.filters,
		placeType: this.props.placeType,
		loading: false,
		currentResults: []
	};

	reduceFilters(filtersHash) {
		Object.entries(filtersHash).reduce((acc, curr) => {
			if (curr[1]) acc.push(curr[0]);
			return acc;
		}, []);
	}

	loadNewResults() {
		this.setState({
			loading: true
		});
		this.setState({
			currentResults: this.calculateResults()
		});
		this.setState({
			loading: false
		});
	}

	configIsComplete(searchPrefsObject) {
		return [
			!!searchPrefsObject.location.lat,
			!!searchPrefsObject.location.lng,
			!!searchPrefsObject.placeType,
			Object.values(searchPrefsObject.filters).includes(true)
		].every(el => el == true);
	}

	calculateResults() {
		const filtersArray = this.reduceFilters(this.state.filters);
		const placeType = this.state.placeType;
		const typeFiltered = this.props.allRecords.filter(
			record => record.type == placeType,
		);

		const valueFiltered = typeFiltered.filter(record =>
			record.values.some(val => filtersArray.includes(val)),
		);

		let coords = {
			lat: this.state.location.lat,
			lng: this.state.location.lng
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

		const orderedByDistance = distanceAdded.sort(
			(a, b) => a.distanceTo - b.distanceTo,
		);

		console.log(
			`Finished working up results and we have ${
				orderedByDistance.length
			} of them`,
		);

		return orderedByDistance;
	}

	componentWillReceiveProps(nextProps, nextState) {
		if (this.configIsComplete(nextState)) {
			console.log('Component updated and search config is complete');
		}

		const changed = [
			this.state.placeType == nextProps.placeType,
			this.state.location.lat == nextProps.location.lat,
			this.state.location.lng == nextProps.location.lng,
			Object.keys(this.state.filters).every(
				filterName =>
					this.state.filters[filterName] == nextProps.filters[filterName],
			)
		].some(el => el == false);

		if (changed) {
			console.log('It appears user prefs have changed');
		}
	}

	// componentDidMount() {
	// 	if (this.configIsComplete(this.state)) {
	// 		this.loadNewResults();
	// 	}
	// }

	render = ({}, { loading, currentResults, filters, placeType, location }) => (
		<section class="section">
			<div class="filters-bar">
				<a href="/places" class="placeType-pill box">
					<ValueIcon name={placeType} className="placeType-pill__icon" />
				</a>
				<a href="/values" class="filters-pill box">
					{Object.entries(filters).map(filter => (
						<ValueIcon
							name={filter[0]}
							inactive={!filter[1]}
							className="filters-pill__icon"
						/>
					))}
				</a>
			</div>
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					{loading ? (
						<div class="load-container has-text-purple">
							<i class="fas fa-spinner fa-pulse" />
						</div>
					) : (
						<div class="results">
							{currentResults && currentResults.length
								? currentResults.map(record => <SearchResult data={record} />)
								: 'No results here.'}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
