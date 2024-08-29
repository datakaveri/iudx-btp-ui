import React from "react";
import hmt_layer from "@/data/road_closure/roads.json";
import { Layer, Source } from "react-map-gl";
import { getClosedLayerProps } from "./getClosedLayerProps";
import { useAppSelector } from "@/lib/store/hooks";

const HMTLayer = () => {
	const closureLayers = useAppSelector(
		(state) => state.mapLayer.closureLayers
	);

	return (
		<div>
			{hmt_layer.features.map((feature, index) => (
				<Source
					id={feature.id}
					key={index}
					type="geojson"
					data={feature}
				>
					<Layer
						id={feature.id}
						{...getClosedLayerProps(closureLayers[feature.id])}
					/>
				</Source>
			))}
		</div>
	);
};

export default HMTLayer;
