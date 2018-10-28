import { Component } from 'preact';

export default class ValueFilters extends Component {
	state = {
		localOwned: this.props.filters.localOwned,
		livingWage: this.props.filters.livingWage,
		recruitsVeterans: this.props.filters.recruitsVeterans,
		sustainable: this.props.filters.sustainable,
		womenOwned: this.props.filters.womenOwned
	}

	setStateValue = ev => {
		let valueName = ev.target.dataset.name;
		let newValue = !this.state[valueName];
		if (valueName) {
			this.setState({ [valueName]: newValue });
			this.props.setGlobalFilter(valueName, newValue);
		}
	}

	render = ({ modal }, { localOwned, livingWage, recruitsVeterans, sustainable, womenOwned }) => (
		<section class="section">
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					<div class="container">
						<h1 class="title has-text-brown">Values</h1>
						{!modal &&
							<h2 class="subtitle has-text-brown">Select as many as you like.</h2>
						}
					</div>
					<div class="filters">
						<button data-name="localOwned" onClick={this.setStateValue}
							class={`filters__button ${localOwned && 'is-selected'} has-text-teal has-background-teal`}
						>
							<i class="fas fa-store" /> locally owned
						</button>
						<button data-name="livingWage" onClick={this.setStateValue}
							class={`filters__button ${livingWage && 'is-selected'} has-text-gold has-background-gold`}
						>
							<i class="fas fa-coins" /> living wage
						</button>
						<button data-name="recruitsVeterans" onClick={this.setStateValue}
							class={`filters__button ${recruitsVeterans && 'is-selected'} has-text-red has-background-red`}
						>
							<i class="fas fa-medal" /> recruits veterans
						</button>
						<button data-name="sustainable" onClick={this.setStateValue}
							class={`filters__button ${sustainable && 'is-selected'} has-text-green has-background-green`}
						>
							<i class="fas fa-globe-americas" /> sustainable
						</button>
						<button data-name="womenOwned" onClick={this.setStateValue}
							class={`filters__button ${womenOwned && 'is-selected'} has-text-purple has-background-purple`}
						>
							<i class="fas fa-venus" /> women-owned
						</button>
					</div>
				</div>
				<div id="cta">
					{modal ?
						<button class="button has-text-weight-bold is-size-4 is-danger is-outlined">Cancel</button> :
						<a href="/" class="button has-text-weight-bold is-size-4 is-danger is-outlined">Back</a>
					}
					<a href="/places" class="button has-text-weight-bold is-size-4 is-danger">Next</a>
				</div>
			</div>
		</section>
	);
}