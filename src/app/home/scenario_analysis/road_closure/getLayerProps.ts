import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

export const getLayerProps = (value: number) => {
	const scale = chroma
		// .scale(["green", "orange", "red"])
		// .domain([0, 0.1, 0.2, 0.3]);
		// green yellow red
		// 30  100 180
		.scale(["green", "yellow", "red"])
		.domain([0, 2, 10]);
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
