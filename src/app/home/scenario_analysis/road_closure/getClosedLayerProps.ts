import { LayerProps } from "react-map-gl";

export const getClosedLayerProps = () => {
	const layerStyle: LayerProps = {
		type: "line",
		source: "my_data",
		layout: {},
		paint: {
			"line-color": "purple",
			"line-width": 2,
		},
	};

	return layerStyle;
};
