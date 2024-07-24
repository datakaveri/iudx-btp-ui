import React from "react";
import wardData from "@/data/wardtimeseries.json";
import Source from "react-map-gl/dist/esm/components/source";
import { Layer } from "react-map-gl";
import { dataLayer } from "./getLayerProps";

const WardsLayer = () => {
	return (
		<Source
			key={`wardsLayer`}
			id={`wardsLayer`}
			type="geojson"
			data={wardData}
		>
			<Layer {...dataLayer} />
		</Source>
	);
};

export default WardsLayer;
