import { Component } from 'preact';

import ValueIcon from './valueIcon';

export default class SearchResult extends Component {
	state = {
		googleLoading: false,
		yelpLoading: false
	};

	render = ({ data }, {}) => (
		<div class="search-result box">
			<div class="search-result__left">
				<div class="search-result__title">{data.name}</div>
				<div>{data.type}</div>
				<div class="search-result__values">
					{data.values.map(valueName => (
						<ValueIcon className="search-result__value" name={valueName} />
					))}
				</div>
			</div>
			<div class="search-result__right">
				<i class="search-result__arrow far fa-arrow-alt-circle-right" />
			</div>
		</div>
	);
}
