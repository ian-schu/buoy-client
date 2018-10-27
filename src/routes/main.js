const Main = () => (
	<section class="section">
		<div id="landing" class="hero is-medium is-marginless">
			<div class="hero-body">
				<div class="container">
					<h1 class="title has-text-brown">Put your money where your heart is.</h1>
					<h2 class="subtitle has-text-brown">Find &amp; support businesses that share your values.</h2>
				</div>
				<div class="hero-values">
					<div class="hero-values__value hero-values__value--first-row has-text-teal ">
						<i class="fas fa-store" />
						<span>locally owned</span>
					</div>
					<div class="hero-values__value hero-values__value--first-row has-text-gold ">
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
			<div class="container">
				<div class="buttons no-wrap">
					<button class="button has-text-weight-bold is-size-5 is-danger is-outlined">Enter ZIP</button>
					<button class="button has-text-weight-bold is-size-5 is-danger">Use my location</button>
				</div>
			</div>
		</div>
	</section>
);

export default Main;