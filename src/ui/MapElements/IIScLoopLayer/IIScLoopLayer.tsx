import React from "react";
import iisc_loop from "@/data/cameras/extended_loop.json";
import { Layer, Source } from "react-map-gl";
import { getLayerProps } from "./getLayerProps";

const IIScLoopLayer = () => {
	return (
		<>
			{iisc_loop.features.map((feature, index) => {
				return (
					<Source
						key={index.toString()}
						id={`iisc_loop-${index.toString()}`}
						type="geojson"
						data={feature.geometry}
					>
						<Layer
							id={`iisc_loop-${index.toString()}`}
							{...getLayerProps(feature.properties.traffic)}
						/>
					</Source>
				);
			})}
		</>
	);
};

export default IIScLoopLayer;
