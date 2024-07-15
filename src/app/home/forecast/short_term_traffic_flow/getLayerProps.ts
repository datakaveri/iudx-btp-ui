import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

export const getLayerProps = (
	value: number,
	max: number,
	min: number,
	mean: number,
	sd: number
) => {
	const scale = chroma
		.scale(["green", "yellow", "orange", "red"])
		.domain([min, mean - 0.625 * sd, mean, mean + 0.625 * sd, max]);
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
