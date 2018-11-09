/* eslint-disable no-console */
import { Component } from 'preact';
import { geocode } from '../apis/geocode';
import classnames from 'classnames';
import SvgIsland from '../components/svg/island';

export default class Location extends Component {
	state = {
		enteredZip: '',
		zipIsValid: false,
		settingZip: false,
		isLoading: false
	};

	chooseZip = () => {
		this.setState({
			settingZip: true
		});
	};

	cancelChooseZip = () => {
		this.setState({
			settingZip: false
		});
	};

	onZipType = ev => {
		if (ev.key == 'Enter') {
			this.submit();
		}
	};

	changeZip = ev => {
		const value = ev.target.value;
		this.setState({
			enteredZip: value,
			zipIsValid: /^\d{5}$/.test(value)
		});
	};

	submit = () => {
		if (!this.state.zipIsValid) return;

		this.setState({
			isLoading: true
		});
		geocode('address', this.state.enteredZip)
			.then(locationManifest => {
				console.log(locationManifest);
				this.props.locationHandlers.changeLocation(locationManifest);
			})
			.catch(err => {
				console.log("Oh, that didn't work ...");
			});
	};

	getLocation = () => {
		this.props.locationHandlers.setLocationLoading();

		const promise = new Promise((resolve, reject) => {
			window.navigator.geolocation.getCurrentPosition(resolve, reject);
		});

		promise
			.then(result => {
				console.log(JSON.stringify(result.coords));
				this.props.locationHandlers.setLocationFromNavigator(result);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render = (
		{ location },
		{ enteredZip, zipIsValid, settingZip, isLoading },
	) => {
		const findMeClass = classnames(
			'button has-text-weight-bold is-size-4 is-danger',
			{
				'is-loading': location.loading
			},
		);

		const goButtonClass = classnames(
			'button has-text-weight-bold is-size-4 is-danger',
			{
				'is-loading': isLoading
			},
		);

		return (
			<section class="section">
				<div id="landing" class="hero is-medium is-marginless">
					<div class="hero-body">
						<div class="container">
							<h1 class="title has-text-brown">Location</h1>
							<h2 class="subtitle has-text-brown">Where ya at, sailor?</h2>
						</div>
						<div class="location-hero">
							{location.data.lat ? (
								<div class="location-hero__text">
									<div>Last known position:</div>
									<div>Lat: {location.data.lat.toFixed(1)}</div>
									<div>Long: {location.data.lng.toFixed(1)}</div>
									<div>City: {location.data.city}</div>
								</div>
							) : null}
							<img class="location-hero__logo" src="./assets/logo-red.svg" />
							{/* <SvgIsland className="location-hero__island" /> */}
							<SvgIsland svgClass="location-hero__water" pathClass="location-hero__water__path" fill="#d5f2ff" />
						</div>
					</div>
					{settingZip ? (
						<div id="cta" class="container">
							<button
								onClick={this.cancelChooseZip}
								class="button has-text-weight-bold is-size-4 is-danger is-outlined"
							>
								X
							</button>
							<input
								value={enteredZip}
								onInput={this.changeZip}
								onKeyPress={this.onZipType}
								class="input is-large is-danger"
								type="text"
								placeholder="enter zip"
								pattern="\d{7}"
							/>

							<button
								onClick={this.submit}
								disabled={!zipIsValid}
								class={goButtonClass}
							>
								Go
							</button>
						</div>
					) : (
						<div id="cta">
							<button onClick={this.getLocation} class={findMeClass}>
								<span class="icon is-small">
									<i class="fas fa-location" />
								</span>
								Find Me
							</button>
							<button
								onClick={this.chooseZip}
								class="button has-text-weight-bold is-size-4 is-danger is-outlined"
							>
								Enter ZIP
							</button>
						</div>
					)}
				</div>
			</section>
		);
	};
}
