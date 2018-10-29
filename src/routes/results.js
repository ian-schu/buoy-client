import { Component } from 'preact';
import SearchResult from '../components/searchResult';

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

	render = (
		{ location, filters, placeType, results, resultsLoading },
		{ showModal, modalType }
	) => (
		<section class="section">
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					{resultsLoading && <div>Results loading</div>}
					{!showModal &&
						!resultsLoading && (
						<div class="results">
							{results && results.length
								? results.map(record => (
									<SearchResult
										name={record.fields['Location-name']}
										type={record.fields['Location-type']}
										values={record.fields.Values}
									/>
									  ))
								: 'No results here.'}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
