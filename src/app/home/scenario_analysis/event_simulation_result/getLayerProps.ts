import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

export const getLayerProps = (value: number) => {
	const scale = chroma.scale(["green", "yellow", "red"]).domain([10, 20, 30]);
	const layerStyle: LayerProps = {
		type: "fill",
		source: "my_data",
		layout: {},
		paint: {
			"fill-color": scale(value).hex(),
			"fill-opacity": 0.7,
		},
	};

	return layerStyle;
};