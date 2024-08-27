import hmt_simulated from "@/data/road_closure/hmt_simulated_closed.json";
import msr_simulated from "@/data/road_closure/msr_simulated_closed.json";
import hmt_original from "@/data/road_closure/hmt_original_closed.json";
import msr_original from "@/data/road_closure/msr_original_closed.json";
import gnn_predicted_hmt from "@/data/road_closure/hmt_gnn_closed.json";

import gnn_predicted_msr from "@/data/road_closure/msr_gnn_closed.json";

export const selectClosureData = (
	closure: "original" | "simulated" | "gnn_predicted",
	roadType: string
) => {
	switch (closure) {
		case "original":
			return roadType === "hmt_road" ? hmt_original : msr_original;
		case "simulated":
			return roadType === "hmt_road" ? hmt_simulated : msr_simulated;
		case "gnn_predicted":
			return roadType === "hmt_road"
				? gnn_predicted_hmt
				: gnn_predicted_msr;
	}
};
