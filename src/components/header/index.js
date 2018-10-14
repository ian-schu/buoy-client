import { h, Component } from 'preact';

export default class Header extends Component {
	state = {
		expanded: false
	};

	toggle = () => {
		this.setState({ expanded: !this.state.expanded });
	}

	render({}, { expanded }) {
		return (
			<nav class="navbar is-link" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a href="/" class="navbar-item">Dat NotMap</a>
					<a role="button" class={`navbar-burger ${expanded && 'is-active'}`}
						data-target="navMenu" aria-label="menu" onClick={this.toggle} aria-expanded={expanded}
					>
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</a>
				</div>
				<div class={`navbar-menu ${expanded && 'is-active'}`}>
					<div class="navbar-end">
						<a href="/filter" class="navbar-item">Filter</a>
					</div>
				</div>
			</nav>
		);
	}
}
