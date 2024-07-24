import { LayerProps } from "react-map-gl";

export const getLayerProps = () => {
	const layerStyle: LayerProps = {
		type: "line",
		source: "my_data",
		layout: {},
		paint: {
			"line-color": ["get", "description"],
			"line-width": 3,
		},
	};

	return layerStyle;
};
