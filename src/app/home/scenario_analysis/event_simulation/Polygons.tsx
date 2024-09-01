import React, { useMemo } from "react";
import msr_polygon from "@/data/polygon_closure/msr_loop_polygon_2.json";
import { Layer, Source } from "react-map-gl";
import { getPolygonLayerProps } from "./getPolygonLayerProps";

interface Props {
	onPolygon: boolean;
}

const Polygons = ({ onPolygon }: Props) => {
	const polygons = useMemo(
		() => (
			<Source id={`polygonLoop`} type="geojson" data={msr_polygon as any}>
				<Layer
					id={`polygonLoop`}
					{...getPolygonLayerProps(onPolygon)}
				/>
			</Source>
		),
		[onPolygon]
	);

	return polygons;
};

export default Polygons;
