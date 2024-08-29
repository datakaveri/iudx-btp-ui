"use client";

import { Typography } from "@mui/material";
import ClosureButtons from "./ClosureButtons";
import TimeSliderComponent from "@/app/home/forecast/short_term_traffic_flow/TimeSliderComponent";
import { useAppSelector } from "@/lib/store/hooks";
import { selectClosureData } from "./selectClosureData";
import Map, { Layer, MapRef, Source } from "react-map-gl";

import { getLayerProps } from "./getLayerProps";
import { MutableRefObject, useRef } from "react";
import ClosedRoads from "./ClosedRoads";
import { MAPBOX_API_KEY } from "@/environments/environments";
import { MAPBOX_STYLES } from "@/lib/sync-video-player/constants";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSearchParams } from "next/navigation";

export default function Page() {
	const mapStyle = useAppSelector((state) => state.mapStyle.value);
	const closure = useAppSelector((state) => state.mapLayer.closure);

	const timeValue = useAppSelector((state) => state.timeSlider.value);
	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();

	const searchParams = useSearchParams();
	const roadType = searchParams.get("keyword")
		? searchParams.get("keyword")
		: "MS Ramaiah Road";

	const timestamps = selectClosureData(closure, roadType).timestamps;
	const values = selectClosureData(closure, roadType).values;
	const geojsons = selectClosureData(closure, roadType).geojsons;

	return (
		<div>
			<Typography variant="h5">Road Closure for {roadType}</Typography>

			<Map
				reuseMaps
				mapboxAccessToken={MAPBOX_API_KEY}
				initialViewState={{
					latitude: 13.021773235458033,
					longitude: 77.57145036562521,
					zoom: 13,
					bearing: 0,
					pitch: 0,
				}}
				mapStyle={
					MAPBOX_STYLES.find((el) => el.value === mapStyle)?.url
				}
				ref={mapRef}
				style={{
					width: "100%",
					height: "70vh",
					margin: 0,
					padding: 0,
				}}
			>
				{geojsons.map((feature, index) => {
					return (
						<Source
							key={index.toString()}
							id={`new_loop-${index.toString()}`}
							type="geojson"
							data={feature.geometry}
						>
							<Layer
								id={`new_loop-${index.toString()}`}
								{...getLayerProps(values[timeValue][index])}
							/>
						</Source>
					);
				})}
				<ClosedRoads />
			</Map>

			<TimeSliderComponent timestamps={timestamps} />

			<Typography
				variant="h6"
				sx={{
					paddingTop: "10px",
					paddingBottom: "5px",
				}}
			>
				Closures
			</Typography>

			<ClosureButtons />
		</div>
	);
}
