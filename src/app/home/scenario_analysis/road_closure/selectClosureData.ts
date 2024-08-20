import simulated from "@/data/road_closure/simulated_closure.json";
import original from "@/data/road_closure/original_sorted.json";
import gnn_predicted from "@/data/road_closure/gnn_closure.json";

export const selectClosureData = (
	closure: "original" | "simulated" | "gnn_predicted"
) => {
	switch (closure) {
		case "original":
			return original;
		case "simulated":
			return simulated;
		case "gnn_predicted":
			return gnn_predicted;
	}
};
