/* eslint-disable react/prefer-stateless-function */
import { Component } from 'preact';

export default class Main extends Component {
	render = ({ location }, {}) => (
		<section class="section">
			<div id="landing" class="hero is-medium is-marginless">
				<div class="hero-body">
					<div class="container">
						<h1 class="title has-text-brown">
							Put your money where your heart is.
						</h1>
						<h2 class="subtitle has-text-brown">
							Find &amp; support businesses that share your values.
						</h2>
					</div>
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
				</div>
				<div id="cta">
					<a
						href="/values"
						class={'button has-text-weight-bold is-size-4 is-danger'}
					>
						Find Places
					</a>
				</div>
			</div>
			<div class="about">
				<img src="../../assets/artwork/logo-red.svg" alt="Buoy logo" class="about__logo" />
				<div class="about__group">
					<h1 class="about__group__title">What is Buoy?</h1>
					<p class="about__group__p">
						It’s a collection of organizations that stand for something more
						than just profits, and walk the talk. An “easy” button for conscious
						consumerism. A literal moral compass.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">How did we choose our criteria?</h1>
					<p class="about__group__p">
						We can imagine all kinds of values being championed in Buoy. For our
						launch, we looked at the top five that were easily verifiable and
						would be valuable to all types of people— not just those like us.
					</p>
					<p class="about__group__p">
						The businesses were added by us from a collection of sites that list
						organizations with these values, like chambers of commerce, veterans
						organizations, or environmentally minded sites.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">Can I add places?</h1>
					<p class="about__group__p">
						Sure! We’re only live in Austin right now and it’ll take some time
						to add a submission. Suggest a business addition here.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">How can I support Buoy?</h1>
					<p class="about__group__p">
						If you’re a business, you can become a sponsor here! If you’re
						anyone at all, you can share us with your friends and suggest places
						to be added to Buoy.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">Why does Buoy exist?</h1>
					<p class="about__group__p">
						A buoy is a nautical beacon that communicates lots of different
						things to boats nearby, like “safe water”. After watching numerous
						local gems sink, we built Buoy to help people navigate to businesses
						they believe in and want to support.
					</p>
				</div>
			</div>
		</section>
	);
}
