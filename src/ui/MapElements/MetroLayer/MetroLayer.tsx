import React from "react";
import metro_line from "@/data/metro-lines-stations.json";
import Source from "react-map-gl/dist/esm/components/source";
import { Layer } from "react-map-gl";
import { getLayerProps } from "./getLayerProps";

const MetroLayer = () => {
	return (
		<Source
			key={`metroLayer`}
			id={`metroLayer`}
			type="geojson"
			data={metro_line}
		>
			<Layer id={`metroLayer`} {...getLayerProps()} />
		</Source>
	);
};

export default MetroLayer;
