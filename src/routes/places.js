import { Component } from 'preact';

export default class ValueFilters extends Component {
	state = {
		placeType: this.props.placeType
	}

	setComponentPlaceType = ev => {
		const value = ev.target.dataset.name;
		if (value) {
			this.setState({ placeType: value });
			this.props.setGlobalPlaceType(value);
		}
		
	}

	render = ({ modal }, { placeType }) => (
		<section class="section">
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					<div class="container">
						<h1 class="title has-text-brown">Places</h1>
						{!modal &&
							<h2 class="subtitle has-text-brown">Change your choice any time.</h2>
						}
					</div>
					<div class="places">
						<button data-name="food" onClick={this.setComponentPlaceType}
							class={`filters__button ${placeType === 'food' && 'is-selected'} has-text-brown has-background-brown`}
						>
							<i class="far fa-utensils-alt" /> food
						</button>
						<button data-name="retail" onClick={this.setComponentPlaceType}
							class={`filters__button ${placeType === 'retail' && 'is-selected'} has-text-brown has-background-brown`}
						>
							<i class="far fa-shopping-bag" /> retail
						</button>
						<button data-name="service" onClick={this.setComponentPlaceType}
							class={`filters__button ${placeType === 'service' && 'is-selected'} has-text-brown has-background-brown`}
						>
							<i class="far fa-concierge-bell" /> service
						</button>
					</div>
				</div>
				<div id="cta">
					{modal ?
						<button class="button has-text-weight-bold is-size-4 is-danger is-outlined">Cancel</button> :
						<a href="/values" class="button has-text-weight-bold is-size-4 is-danger is-outlined">Back</a>
					}
					<button onClick={this.setValues} class="button has-text-weight-bold is-size-4 is-danger">Search</button>
				</div>
			</div>
		</section>
	);
}