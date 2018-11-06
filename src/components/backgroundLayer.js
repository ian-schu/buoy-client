import Router from 'preact-router';
import Match from 'preact-router/match';

import SvgBeach from '../components/svg/beach';
import SvgOcean from '../components/svg/ocean';

const BackgroundLayer = () => (
	<div>
		<Match path="/">{
			({ matches }) => matches &&
				<div class="background-layer home">
					<SvgBeach className="background-svg beach" />
					<SvgOcean className="background-svg ocean" />
				</div>
		}
		</Match>
		<Router />
	</div>
);

export default BackgroundLayer;
