import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

export const getLayerProps = (value: number) => {
	const scale = chroma
		.scale(["red", "yellow", "orange", "green"])
		.domain([0, 5, 20, 100]);
	const layerStyle: LayerProps = {
		type: "line",
		source: "my_data",
		layout: {},
		paint: {
			"line-color": scale(value).hex(),
			"line-width": 2,
		},
	};

	return layerStyle;
};
