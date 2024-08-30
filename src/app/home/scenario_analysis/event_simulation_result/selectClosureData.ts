import original from "@/data/simulation/original.json";
import simulated from "@/data/simulation/simulated.json";
import gnn_predicted from "@/data/road_closure/msr_predicted.json";
import diff from "@/data/simulation/diff.json";

export const selectClosureData = (
	closure: "original" | "simulated" | "gnn_predicted" | "difference"
) => {
	switch (closure) {
		case "original":
			return original;
		case "simulated":
			return simulated;
		case "gnn_predicted":
			return {};
		case "difference":
			return diff;
	}
};
