import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

export const getLayerProps = (value: number, visible: boolean) => {
	const scale = chroma.scale(["green", "yellow", "red"]).domain([0, 2, 10]);
	const layerStyle: LayerProps = {
		type: "fill",
		source: "my_data",
		layout: {},
		paint: {
			"fill-color": visible ? scale(value).hex() : "grey",
			"fill-opacity": 0.7,
		},
	};

	return layerStyle;
};
