import type { FillLayer } from "react-map-gl";

export const dataLayer: FillLayer = {
	id: "wardsLayer",
	type: "fill",
	paint: {
		"fill-color": {
			property: "LOST_AREA_SQ_KM",
			stops: [
				[0.05, "#3288bd"],
				[0.1, "#66c2a5"],
				[0.2, "#abdda4"],
				[0.3, "#e6f598"],
				[0.4, "#ffffbf"],
				[0.5, "#fee08b"],
				[0.6, "#fdae61"],
				[0.7, "#f46d43"],
				[8, "#d53e4f"],
			],
		},
		// "fill-color": "red",
		"fill-outline-color": "black",
		"fill-opacity": 0.4,
	},
};
