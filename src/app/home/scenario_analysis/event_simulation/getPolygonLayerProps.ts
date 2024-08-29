import { LayerProps } from "react-map-gl";

export const getPolygonLayerProps = (onPolygon: boolean) => {
	const layerStyle: LayerProps = {
		type: "fill",
		source: "my_data",
		layout: {},
		paint: {
			"fill-color": "blue",
			"fill-outline-color": "black",
			"fill-opacity": onPolygon ? 0.8 : 0.6,
		},
	};

	return layerStyle;
};
