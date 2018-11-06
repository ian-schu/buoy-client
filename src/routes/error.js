const Error = () => (
	<section class="section">
		<div id="landing" class="hero is-medium is-marginless">
			<div class="hero-body">
				<div class="container error">
					<h1 class="title has-text-brown">
						Ugh, sorry <i class="fal fa-flushed" /> something went wrong here.
					</h1>
					<img src="../../assets/artwork/logo-red.svg" class="logo" />
					<h2 class="subtitle has-text-brown">
						This app is still new and we're ironing things out. Technology,
						right?
					</h2>
					<h2 class="subtitle has-text-brown">
						To fix this, just go back to the homepage:
					</h2>
				</div>
			</div>
			<div id="cta">
				<a href="/" class="button has-text-weight-bold is-size-4 is-danger">
					Ok, fine ..
				</a>
			</div>
		</div>
	</section>
);

export default Error;
