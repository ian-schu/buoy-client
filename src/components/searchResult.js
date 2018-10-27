import { h, Component } from 'preact';

export default class SearchResult extends Component {
	state = {
		googleLoading: false,
		yelpLoading: false
	};


	render({ name, type, values }, { }) {
		return (
			<div class="box">
				<div>Name: {name}</div>
				<div>Type: {type}</div>
				<div>Values: {values.join(', ')}</div>
			</div>
		);
	}
}
