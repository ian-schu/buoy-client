import { Component } from 'preact';

import ValueIcon from './valueIcon';

export default class SearchResult extends Component {
	state = {
		googleLoading: false,
		yelpLoading: false
	};

	render = ({ name, type, values }, {}) => (
		<div className="search-result box">
			<div className="search-result__left">
				<div className="search-result__title">{name}</div>
				<div>{type}</div>
				<div class="search-result__values">
					{values.map(name => (
						<ValueIcon name={name} />
					))}
				</div>
			</div>
			<div className="search-result__right">
				<i className="search-result__arrow far fa-arrow-alt-circle-right" />
			</div>
		</div>
	);
}
