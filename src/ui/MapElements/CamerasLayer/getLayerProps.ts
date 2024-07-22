import { LayerProps } from "react-map-gl";

export const getLayerProps = () => {
	const layerStyle: LayerProps = {
		type: "symbol",
		source: "my_data",
		layout: {},
		paint: {},
	};

	return layerStyle;
};
