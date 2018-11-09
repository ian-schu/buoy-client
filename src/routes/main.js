/* eslint-disable react/prefer-stateless-function */
import { Component } from 'preact';

const welcomeTitle = configComplete =>
	({
		true: 'Put your money where your heart is.',
		false: 'Oh hi! Welcome back, citizen sailor.'
	}[!configComplete]);

const welcomeSubTitle = configComplete =>
	({
		true: 'Find & support businesses that share your values.',
		false: 'Wanna just jump into your most recent search results?'
	}[!configComplete]);

const buoyLogo = (
	<img src="./assets/logo-red.svg" alt="Buoy logo" class="logo" />
);

const valueCluster = (
	<div class="hero-values">
		<div class="hero-values__value hero-values__value--first-row has-text-teal">
			<i class="fas fa-store" />
			<span>locally owned</span>
		</div>
		<div class="hero-values__value hero-values__value--first-row has-text-gold">
			<i class="fas fa-coins" />
			<span>living wage</span>
		</div>
		<div class="hero-values__value hero-values__value--wide has-text-red">
			<i class="fas fa-medal" />
			<span>recruits veterans</span>
		</div>
		<div class="hero-values__value has-text-green">
			<i class="fas fa-globe-americas" />
			<span>sustainable</span>
		</div>
		<div class="hero-values__value has-text-purple">
			<i class="fas fa-venus" />
			<span>women-owned</span>
		</div>
	</div>
);

export default class Main extends Component {
	render = ({ resetPrefs, location, configComplete }, {}) => (
		<section class="section">
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					<div class="container">
						<h1 class="title has-text-brown">{welcomeTitle(configComplete)}</h1>
						<h2 class="subtitle has-text-brown">
							{welcomeSubTitle(configComplete)}
						</h2>
					</div>
					{configComplete ? <div class="center">{buoyLogo}</div> : null}
					{configComplete && (
						<div id="cta" class="cta--vertical">
							<a
								href="/results"
								class={'button has-text-weight-bold is-size-4 is-danger'}
							>
								Yeah let's go!
							</a>
							<a
								href="/values"
								onClick={resetPrefs}
								class="button has-text-weight-bold is-size-4 is-danger is-outlined"
							>
								Nah, start over
							</a>
						</div>
					)}
					{!configComplete && valueCluster}
				</div>
				{!configComplete && (
					<div id="cta">
						<a
							href="/values"
							class={'button has-text-weight-bold is-size-4 is-danger'}
						>
							Find Places
						</a>
					</div>
				)}
			</div>
			<div class="about">
				{!configComplete ? buoyLogo : null}
				<div class="about__group">
					<h1 class="about__group__title">What is Buoy?</h1>
					<p class="about__group__p">
						It's an easy button for conscious consumerism. A literal moral
						compass, if you will. A directory of local businesses that are doing
						things you care about. Next time you want to go eat, drink, or shop,
						try Buoy instead of Yelp or Google Maps. We&apos;re adding more
						establishments all the time.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">Want to know more?</h1>
					<p class="about__group__p">
						We'd love to <a href="/about">tell you more.</a>
					</p>
				</div>
			</div>
		</section>
	);
}
