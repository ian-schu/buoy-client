/* eslint-disable react/prefer-stateless-function */
import { Component } from 'preact';

const buoyLogo = (
	<img src="./assets/logo-red.svg" alt="Buoy logo" class="logo" />
);

export default class Main extends Component {
	render = ({}, {}) => (
		<section class="section">
			<div class="about">
				{buoyLogo}
				<h1 class="title has-text-brown">About Buoy</h1>
				<h2 class="subtitle has-text-brown">
					A little, literal, digital moral compass
				</h2>
				<div class="about__group">
					<h1 class="about__group__title">Why does Buoy exist?</h1>
					<p class="about__group__p">
						We've watched numerous local gems tread water or sink as our city
						(Austin) has become more expensive and gentrified. We wanted to
						build something to make these local gems more visible, memorable,
						and easy to love.
					</p>
					<p class="about__group__p">
						Now, <em>a buoy</em> is a nautical beacon for passing ships, which
						can signal things like "special thing" or "danger here". To be
						technical, we chose the color scheme for <em>safe water</em>.
					</p>
					<p class="about__group__p">
						But more to the point, we built Buoy to help people navigate to
						businesses they believe in and want to support.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">How did we choose our criteria?</h1>
					<p class="about__group__p">
						We can imagine all kinds of values being championed in Buoy. For our
						launch in the fall of 2018, we chose a limited set of traits and
						business practices that were easily verified by chambers of commerce
						and local advocacy groups.
					</p>
					<p class="about__group__p">
						It's not hard to imagine this list growing and becoming much more
						elaborate. Along the way we'll have to work hard to keep our labels
						objective. We'll need help from interested citizens like yourself to
						do the right thing here.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">Can I add places?</h1>
					<p class="about__group__p">
						Not yet, but soon! Check back here in a little while and we'll have
						a means for you to contribute.
					</p>
				</div>
				<div class="about__group">
					<h1 class="about__group__title">Can I list my business on here?</h1>
					<p class="about__group__p">
						If you're asking this question, we want to talk to you. Feel free to
						click one of those links in the footer ⬇ and get in touch with Ian
						or Robert.
					</p>
				</div>
			</div>
		</section>
	);
}
