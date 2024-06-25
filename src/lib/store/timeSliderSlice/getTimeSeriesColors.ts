import { ColorsListItem } from "./timeSliderSlice";

export const getColorsList: () => ColorsListItem[] = () => {
	const timeSeriesColorsList: ColorsListItem[] = [];

	const primaryColors = [
		"#FF0000", // Red
		"#FFA500", // Orange
		"#FFFF00", // Yellow
		"#008000", // Green
		"#0000FF", // Blue
		"#4B0082", // Indigo
		"#EE82EE", // Violet
		"#FF6347", // Tomato
		"#FF4500", // Orange Red
		"#FFD700", // Gold
		"#00FF00", // Lime
		"#00FFFF", // Cyan
	];

	primaryColors.map((color) => {
		timeSeriesColorsList.push({
			color: color,
			selected: true,
		});
	});

	return timeSeriesColorsList;
};
