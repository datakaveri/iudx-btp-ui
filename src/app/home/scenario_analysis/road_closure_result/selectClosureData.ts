import msr_original from "@/data/road_closure/msr_original.json";
import msr_simulated from "@/data/road_closure/msr_simulated.json";
import msr_gnn_predicted from "@/data/road_closure/msr_predicted.json";
import msr_diff from "@/data/road_closure/msr_diff.json";

import cv_raman_simulated from "@/data/road_closure/cv_raman_original.json";
import cv_raman_original from "@/data/road_closure/cv_raman_closed.json";
import cv_raman_gnn_predicted from "@/data/road_closure/cv_raman_predicted.json";
import cv_raman_diff from "@/data/road_closure/cv_raman_diff.json";

export const selectClosureData = (
	closure: "original" | "simulated" | "gnn_predicted" | "difference",
	roadType: string
) => {
	switch (closure) {
		case "original":
			return roadType === "MS Ramaiah Road"
				? msr_original
				: cv_raman_original;
		case "simulated":
			return roadType === "MS Ramaiah Road"
				? msr_simulated
				: cv_raman_simulated;
		case "gnn_predicted":
			return roadType === "MS Ramaiah Road"
				? msr_gnn_predicted
				: cv_raman_gnn_predicted;
		case "difference":
			return roadType === "MS Ramaiah Road" ? msr_diff : cv_raman_diff;
	}
};
