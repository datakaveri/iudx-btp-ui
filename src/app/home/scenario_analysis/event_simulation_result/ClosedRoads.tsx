import React from "react";
import { Layer, Source } from "react-map-gl";
import { getClosedLayerProps } from "./getClosedLayerProps";
import closedLayer from "@/data/road_closure/closed_roads.json";

const ClosedRoads = () => {
	return (
		<Source id={`closedRoads`} type="geojson" data={closedLayer}>
			<Layer id={`closedRoads`} {...getClosedLayerProps()} />
		</Source>
	);
};

export default ClosedRoads;
