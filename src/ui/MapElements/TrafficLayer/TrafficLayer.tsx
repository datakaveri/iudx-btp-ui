import React from "react";
import data from "@/data/timed_predictions.json";
import Source from "react-map-gl/dist/esm/components/source";
import { Layer } from "react-map-gl";
import { getLayerProps } from "./getLayerProps";

const TrafficLayer = () => {
	console.log(data.geojsons[0]);

	return (
		<Source
			key={`trafficLayer`}
			id={`trafficLayer`}
			type="geojson"
			data={data.geojsons}
		>
			<Layer id={`trafficLayer`} {...getLayerProps()} />
		</Source>
	);
};

export default TrafficLayer;
