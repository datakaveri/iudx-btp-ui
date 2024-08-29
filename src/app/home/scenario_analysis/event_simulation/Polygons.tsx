import React from "react";
import msr_polygon from "@/data/polygon_closure/msr_loop_polygon_2.json";
import { Layer, Source } from "react-map-gl";
import { getPolygonLayerProps } from "./getPolygonLayerProps";

interface Props {
	onPolygon: boolean;
}

const Polygons = ({ onPolygon }: Props) => {
	return (
		<Source id={`polygonLoop`} type="geojson" data={msr_polygon as any}>
			<Layer id={`polygonLoop`} {...getPolygonLayerProps(onPolygon)} />
		</Source>
	);
};

export default Polygons;
