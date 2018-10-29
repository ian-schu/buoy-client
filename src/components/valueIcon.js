import { Component } from 'preact';

export default class ValueIcon extends Component {
	dictionary = {
		'locally-owned': {
			propName: 'localOwned',
			color: 'teal',
			iconClass: 'fas fa-store'
		},
		'living-wage': {
			propName: 'livingWage',
			color: 'gold',
			iconClass: 'fas fa-coins'
		},
		'recruits-veterans': {
			propName: 'recruitsVeterans',
			color: 'red',
			iconClass: 'fas fa-medal'
		},
		sustainable: {
			propName: 'sustainable',
			color: 'green',
			iconClass: 'fas fa-globe-americas'
		},
		'women-owned': {
			propName: 'womenOwned',
			color: 'purple',
			iconClass: 'fas fa-venus'
		}
	};

	render = ({ name }, {}) => (
		<div class={`search-result__value has-text-${this.dictionary[name].color}`}>
			<i class={this.dictionary[name].iconClass} />
		</div>
	);
}
