import { Component } from 'preact';
import SearchResult from '../components/searchResult';
import ValueIcon from '../components/valueIcon';

export default class Results extends Component {
	state = {
		showModal: false,
		modalType: ''
	};

	setModal = modalType => {
		this.setState({
			showModal: true,
			modalType
		});
	};

	setComponentPlaceType = ev => {
		const value = ev.target.dataset.name;
		if (value) {
			this.props.setGlobalPlaceType(value);
		}
	};

	componentDidMount() {
		this.props.getResults();
	}

	render = ({ location, filters, placeType, results }, { showModal, modalType }) => (
		<section class="section">
			<div class="filters-bar">
				{placeType && (
					<a href="/places" class="placeType-pill box">
						<ValueIcon name={placeType} className="placeType-pill__icon" />
					</a>
				)}
				{filters && (
					<a href="/values" class="filters-pill box">
						{Object.entries(filters).map(filter => (
							<ValueIcon name={filter[0]} inactive={!filter[1]} className="filters-pill__icon" />
						))}
					</a>
				)}
			</div>
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					{results.loading && (
						<div class="load-container has-text-purple">
							<i class="fas fa-spinner fa-pulse" />
						</div>
					)}
					{!showModal &&
						!results.loading && (
						<div class="results">
							{results.data && results.data.length
								? results.data.map(record => <SearchResult data={record} />)
								: 'No results here.'}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
