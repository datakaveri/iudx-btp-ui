import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

export const getLayerProps = (value: number) => {
	const scale = chroma.scale(["green", "red"]).domain([0, 9]);
	const layerStyle: LayerProps = {
		type: "line",
		source: "my_data",
		layout: {},
		paint: {
			"line-color": scale(value).hex(),
			"line-width": 5,
		},
	};

	return layerStyle;
};
