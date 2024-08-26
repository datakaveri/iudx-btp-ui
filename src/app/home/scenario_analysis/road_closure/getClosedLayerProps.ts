import { LayerProps } from "react-map-gl";

export const getClosedLayerProps = () => {
	const layerStyle: LayerProps = {
		type: "fill",
		source: "my_data",
		layout: {},
		paint: {
			"fill-color": "purple",
			"fill-outline-color": "black",
			"fill-opacity": 0.8,
		},
	};

	return layerStyle;
};
