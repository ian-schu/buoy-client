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
						<a onClick={this.toggle} href="/" class="navbar-item">
							Home
						</a>
						<a onClick={this.toggle} href="/values" class="navbar-item">
							Choose Values
						</a>
						<a onClick={this.toggle} href="/places" class="navbar-item">
							Set Place Type
						</a>
						<a onClick={this.toggle} href="/location" class="navbar-item">
							Change Location
						</a>
						<a onClick={this.toggle} href="/results" class="navbar-item">
							Results
						</a>
					</div>
				</div>
			</nav>
		);
	}
}
