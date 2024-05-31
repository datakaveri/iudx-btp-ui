import { LayerProps } from "react-map-gl";

interface Props {
	lineColors: string;
	values: number[];
	valueCounts: number;
	min: number;
	max: number;
}

export const getLayerProps = ({
	values,
	lineColors,
	valueCounts,
	min,
	max,
}: Props) => {
	console.log({
		lineColors: lineColors,
		valueCounts: valueCounts,
	});

	const layerStyle: LayerProps = {
		type: "line",
		source: "my_data",
		layout: {},
		paint: {
			"line-color": lineColors,
			"line-width": valueCounts / 10,
		},
	};

	return layerStyle;
};
