import { Component } from 'preact';

import ValueIcon from './valueIcon';

export default class SearchResult extends Component {
	state = {
		googleLoading: false,
		yelpLoading: false
	};

	render({ name, type, values }, {}) {
		return (
			<div class="search-result box">
				<div>Name: {name}</div>
				<div>Type: {type}</div>
				<div class="search-result__values">
					{values.map(name => (
						<ValueIcon name={name} />
					))}
				</div>
			</div>
		);
	}
}
