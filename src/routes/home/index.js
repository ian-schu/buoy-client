import { h } from 'preact';
import { Link } from 'preact-router/match';

const Home = () => (
	<section class="section">
		<div class="hero">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">Put your money where your heart is</h1>
					<h2 class="subtitle">Find &amp; businesses that you&apos;re passionate about.</h2>
				</div>
			</div>
		</div>
		<div class="container columns is-centered">
			<div class="has-text-centered column">
				<Link class="button is-primary" href="/filter">Use my location</Link>
			</div>
			<div class="has-text-centered column">
				<button class="button is-info">Enter Zip</button>
			</div>
		</div>
	</section>
);

export default Home;