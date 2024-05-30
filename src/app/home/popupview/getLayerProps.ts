import chroma from "chroma-js";
import { LayerProps } from "react-map-gl";

interface Props {
	pollutantVal: number;
	min: number;
	max: number;
	average: number;
	stddev: number;
}

export const getLayerProps = ({
	pollutantVal,
	min,
	max,
	average,
	stddev,
}: Props) => {
	const scale = chroma
		.scale(["green", "red"])
		.classes([
			min,
			average - 0.625 * stddev,
			average,
			average + 0.625 * stddev,
			max,
		]);

	const layerStyle: LayerProps = {
		type: "line",
		source: "my_data",
		layout: {},
		paint: {
			"line-color": scale(pollutantVal).hex(),
			"line-width": 5,
		},
	};

	return layerStyle;
};
