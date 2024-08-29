/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async redirects() {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: false,
			},
			{
				source: "/home/forecast",
				destination:
					"/home/forecast/short_term_traffic_flow__comparison",
				permanent: false,
			},
			{
				source: "/home/observe",
				destination: "/home/observe/overview",
				permanent: false,
			},
			{
				source: "/home/scenario_analysis",
				destination:
					"/home/scenario_analysis/traffic_volume_scenario_simulation",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
