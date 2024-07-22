/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async redirects() {
		return [
			{
				source: "/home/forecast",
				destination: "/home/forecast/junction_prediction",
				permanent: false,
			},
			{
				source: "/home/observe",
				destination: "/home/observe/junctions",
				permanent: false,
			},
			{
				source: "/home/scenario_analysis",
				destination:
					"/home/scenario_analysis/traffic_flow_restrictions",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
