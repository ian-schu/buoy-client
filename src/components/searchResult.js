import { Component } from 'preact';

import ValueIcon from './valueIcon';

export default class SearchResult extends Component {
	state = {
		googleLoading: false,
		yelpLoading: false
	};

	render = ({ data }, {}) => {
		const fullAddress = [`${data.address.streetNumber} ${data.address.street}`, data.address.zip].join(
			', ',
		);

		return (
			<div class="search-result box">
				<div class="search-result__left">
					<div class="search-result__title">{data.name}</div>
					<div class="search-result__address">{fullAddress}</div>
					<div class="search-result__type">({data.type})</div>
					<div class="search-result__distance">{data.distance} mi</div>
					<div class="search-result__values">
						{data.values.map(valueName => (
							<ValueIcon className="search-result__value" name={valueName} />
						))}
					</div>
				</div>
				<a href={data.google_url} class="search-result__right">
					<i class="search-result__arrow far fa-arrow-alt-circle-right" />
				</a>
			</div>
		);
	};
}
