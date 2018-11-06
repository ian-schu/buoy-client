import { Component } from 'preact';

export default class ValueFilters extends Component {
	state = {
		loading: false
	};

	setFilter = ev => {
		ev.target.blur();
		let valueName = ev.target.dataset.name;
		let newValue = !this.props.filters[valueName];
		this.props.setFilter(valueName, newValue);
	};

	render = ({ modal, filters }, {}) => (
		<section class="section">
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					<div class="container">
						<h1 class="title has-text-brown">Values</h1>
						<h2 class="subtitle has-text-brown">Select as many as you like.</h2>
					</div>
					<div class="filters">
						<button
							data-name="localOwned"
							onClick={this.setFilter}
							class={`filters__button ${filters.localOwned &&
								'is-selected'} has-text-teal has-background-teal`}
						>
							<i class="fas fa-store" /> locally owned
						</button>
						<button
							data-name="livingWage"
							onClick={this.setFilter}
							class={`filters__button ${filters.livingWage &&
								'is-selected'} has-text-gold has-background-gold`}
						>
							<i class="fas fa-coins" /> living wage
						</button>
						<button
							data-name="recruitsVeterans"
							onClick={this.setFilter}
							class={`filters__button ${filters.recruitsVeterans &&
								'is-selected'} has-text-red has-background-red`}
						>
							<i class="fas fa-medal" /> recruits veterans
						</button>
						<button
							data-name="sustainable"
							onClick={this.setFilter}
							class={`filters__button ${filters.sustainable &&
								'is-selected'} has-text-green has-background-green`}
						>
							<i class="fas fa-globe-americas" /> sustainable
						</button>
						<button
							data-name="womenOwned"
							onClick={this.setFilter}
							class={`filters__button ${filters.womenOwned &&
								'is-selected'} has-text-purple has-background-purple`}
						>
							<i class="fas fa-venus" /> women-owned
						</button>
					</div>
				</div>
				{modal ? (
					<div id="cta">
						<a
							href="/results"
							class={`button has-text-weight-bold is-size-4 is-danger${
								this.state.loading ? 'is-loading' : ''
							}`}
						>
							Save
						</a>
					</div>
				) : (
					<div id="cta">
						<a
							href="/"
							class="button has-text-weight-bold is-size-4 is-danger is-outlined"
						>
							Back
						</a>
						<a
							href="/places"
							class="button has-text-weight-bold is-size-4 is-danger"
						>
							Next
						</a>
					</div>
				)}
			</div>
		</section>
	);
}
