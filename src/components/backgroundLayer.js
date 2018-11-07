import Router from 'preact-router';
import Match from 'preact-router/match';

import SvgBeach from '../components/svg/beach';
// import SvgOcean from '../components/svg/ocean';

const generateBackground = path => {
	if (path == '/') {
		return (
			<div class="background-layer home">
				<SvgBeach className="background-svg beach" />
				{/* <SvgOcean className="background-svg ocean" /> */}
			</div>
		);
	}
	return <div class={`background-layer ${path.split('/')[1]}`} />;
	
};

const BackgroundLayer = () => (
	<div>
		<Match>{({ path }) => generateBackground(path)}</Match>
		<Router />
	</div>
);

export default BackgroundLayer;
