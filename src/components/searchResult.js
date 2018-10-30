import { Component } from 'preact';

import ValueIcon from './valueIcon';

export default class SearchResult extends Component {
	state = {
		googleLoading: false,
		yelpLoading: false
	};

	render = ({ name, type, values }, {}) => (
		<div class="search-result box">
			<div class="search-result__left">
				<div class="search-result__title">{name}</div>
				<div>{type}</div>
				<div class="search-result__values">
					{values.map(name => (
						<ValueIcon className="search-result__value" name={name} />
					))}
				</div>
			</div>
			<div class="search-result__right">
				<i class="search-result__arrow far fa-arrow-alt-circle-right" />
			</div>
		</div>
	);
}
