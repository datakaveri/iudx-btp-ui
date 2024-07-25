import zoom_15 from "@/data/zoomLevels/final_prediction_1.5x_sorted.json";
import zoom_2 from "@/data/zoomLevels/final_prediction_2x_sorted.json";

export const selectZoomData = (zoom: 1.5 | 2 | 3) => {
	switch (zoom) {
		case 1.5:
			return zoom_15;
		case 2:
			return zoom_2;
	}
};
