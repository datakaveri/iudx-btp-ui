import { LayerProps } from "react-map-gl";

export const getClosedLayerProps = (visble: boolean) => {
	const layerStyle: LayerProps = {
		type: "line",
		source: "my_data",
		layout: {},
		paint: {
			"line-color": visble ? "red" : "black",
			"line-width": 6,
			"line-opacity": visble ? 0.7 : 0.4,
		},
	};

	return layerStyle;
};
