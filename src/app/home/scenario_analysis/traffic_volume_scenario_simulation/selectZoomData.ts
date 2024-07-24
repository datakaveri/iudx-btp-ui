import zoom_15 from "@/data/zoomLevels/File_1.5x.json";
import zoom_2 from "@/data/zoomLevels/File_2x.json";
import zoom_3 from "@/data/zoomLevels/File_3x.json";

export const selectZoomData = (zoom: 1.5 | 2 | 3) => {
	switch (zoom) {
		case 1.5:
			return zoom_15;
		case 2:
			return zoom_2;
		case 3:
			return zoom_3;
	}
};
