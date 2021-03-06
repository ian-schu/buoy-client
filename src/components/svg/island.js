const svgIsland = ({ fill, svgClass, pathClass }, {}) => (
	<svg
		class={svgClass}
		viewBox="0 0 500 500"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path class={pathClass}
			d="M124.52 155.04s47.48-9.7 70.25-14.54c22.77-4.84 57.65-28.58 80.42-28.1 22.78.49 47 41.67 43.6 64.44-3.38 22.77-13.17 71.78-43.6 67.83-30.42-3.95-36.07-13.38-64.92-12.11-28.84 1.26-40.21 15.02-54.75 18.4-14.53 3.4-65.89 2.43-72.19-18.4-6.3-20.83 24.23-73.64 41.19-77.52z"
			fill={fill || '#f5e7db'}
		/>
	</svg>
);

export default svgIsland;
