import { h, Component } from 'preact';

export default class Header extends Component {
	state = {
		expanded: false
	};

	toggle = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render({}, { expanded }) {
		return (
			<nav
				class="navbar is-transparent"
				role="navigation"
				aria-label="main navigation"
			>
				<div class="navbar-brand">
					<a href="/" class="navbar-item has-text-weight-bold is-size-2 proper">
						Buoy
					</a>
					<a
						role="button"
						class={`navbar-burger ${expanded && 'is-active'}`}
						data-target="navMenu"
						aria-label="menu"
						onClick={this.toggle}
						aria-expanded={expanded}
					>
						<span aria-hidden="true" />
						<span aria-hidden="true" />
						<span aria-hidden="true" />
					</a>
				</div>
				<div class={`navbar-menu ${expanded && 'is-active'}`}>
					<div class="navbar-end">
						<a href="/" class="navbar-item">
							Home
						</a>
						<a href="/location" class="navbar-item">
							Change Location
						</a>
						<a href="/about" class="navbar-item">
							About Buoy
						</a>
						<a href="/sponsor" class="navbar-item">
							Sponsorships
						</a>
						<a href="/contact" class="navbar-item">
							Contact
						</a>
					</div>
				</div>
			</nav>
		);
	}
}
