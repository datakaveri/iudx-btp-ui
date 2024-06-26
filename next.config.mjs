/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async redirects() {
		return [
			{
				source: "/home/forecast",
				destination: "/home/forecast/short_term_intersection",
				permanent: false,
			},
			{
				source: "/home/observe",
				destination: "/home/observe/traffic",
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
