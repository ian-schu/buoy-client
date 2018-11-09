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
		return Object.keys(filtersHash).reduce((filtersArray, currentKey) => {
			if (filtersHash[currentKey]) {
				filtersArray.push(currentKey);
			}
			return filtersArray;
		}, []);
	}

	setLoading() {
		this.setState(prevState => ({ loading: true }));
	}

	clearLoading() {
		this.setState(prevState => ({ loading: false }));
	}

	simulatedLoadingMs() {
		let value = (400 + Math.random() * 2000).toFixed(0);
		return value;
	}

	loadNewResults() {
		this.setLoading();
		this.setState(prevState => ({ filters: this.props.filters }));
		this.setState(prevState => ({ currentResults: this.calculateResults() }));
		setTimeout(this.clearLoading.bind(this), this.simulatedLoadingMs());
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

		return orderedByDistance;
	}

	loadingIndicator = () => {
		const randomPick = Math.floor(Math.random() * 3);

		const iconName = [
			'far fa-compass',
			'far fa-crosshairs',
			'far fa-life-ring'
		][randomPick];

		const loadMessage = [
			'Zeroing in ...',
			'Setting sail ...',
			'Navigating ...'
		][randomPick];

		return (
			<div class="search-result box load-indicator">
				<i class={`${iconName} fa-spin spinner`} />
				<div class="load-indicator__text">{loadMessage}</div>
			</div>
		);
	};

	noResults = (
		<div class="search-result box load-indicator">
			<div class="load-indicator__text">
				Ah, this doesn't work if you don't select any{' '}
				<a href="/values">values</a>.
			</div>
			<i class="fal fa-laugh-beam" />
		</div>
	);

	componentDidMount() {
		if (this.configIsComplete(this.state)) {
			this.loadNewResults();
		}
	}

	render = ({}, { loading, currentResults, filters, placeType, location }) => (
		<section class="section">
			<div class="filters-bar">
				<a href="/places" class="placeType-pill box">
					<ValueIcon name={placeType} className="placeType-pill__icon" />
				</a>
				<a href="/values" class="filters-pill box">
					{Object.keys(filters).map(filterKey => (
						<ValueIcon
							name={filterKey}
							inactive={!filters[filterKey]}
							className="filters-pill__icon"
						/>
					))}
				</a>
			</div>
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					{loading ? (
						this.loadingIndicator()
					) : !Object.values(filters).includes(true) ? (
						this.noResults
					) : (
						<div class="results">
							{currentResults.map(record => (
								<SearchResult data={record} />
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
