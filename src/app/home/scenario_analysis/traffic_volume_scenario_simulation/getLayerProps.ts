import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

export const getLayerProps = (value: number) => {
	const scale = chroma
		.scale(["green", "gold", "orange", "red"])
		.classes([0, 0.1, 5, 30]);
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
