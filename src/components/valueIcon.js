import { Component } from 'preact';
import classnames from 'classnames';

export default class ValueIcon extends Component {
	dictionary = {
		local_owned: {
			propName: 'local_owned',
			color: 'teal',
			iconClass: 'fas fa-store'
		},
		living_wage: {
			propName: 'living_wage',
			color: 'gold',
			iconClass: 'fas fa-coins'
		},
		recruit_veterans: {
			propName: 'recruit_veterans',
			color: 'red',
			iconClass: 'fas fa-medal'
		},
		sustainable: {
			propName: 'sustainable',
			color: 'green',
			iconClass: 'fas fa-globe-americas'
		},
		women_owned: {
			propName: 'women_owned',
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

	render = ({ name, className, inactive }, { }) => {
		const iconClassName = classnames(className, `has-text-${this.dictionary[name].color}`, {
			inactive
		});

		return (
			<div class={iconClassName}>
				<i class={this.dictionary[name].iconClass} />
			</div>
		);
	};
}
