import { Component } from 'preact';
import classnames from 'classnames';

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
		},
		localOwned: {
			propName: 'localOwned',
			color: 'teal',
			iconClass: 'fas fa-store'
		},
		livingWage: {
			propName: 'livingWage',
			color: 'gold',
			iconClass: 'fas fa-coins'
		},
		recruitsVeterans: {
			propName: 'recruitsVeterans',
			color: 'red',
			iconClass: 'fas fa-medal'
		},
		womenOwned: {
			propName: 'womenOwned',
			color: 'purple',
			iconClass: 'fas fa-venus'
		},
		retail: {
			propName: 'retail',
			color: 'brown',
			iconClass: 'far fa-shopping-bag'
		},
		food: {
			propName: 'food',
			color: 'brown',
			iconClass: 'far fa-utensils-alt'
		},
		service: {
			propName: 'service',
			color: 'brown',
			iconClass: 'far fa-concierge-bell'
		}
	};

	render = ({ name, className, inactive }, {}) => {
		const iconClassName = classnames(
			className,
			`has-text-${this.dictionary[name].color}`,
			{ inactive }
		);

		return (
			<div class={iconClassName}>
				<i class={this.dictionary[name].iconClass} />
			</div>
		);
	};
}
