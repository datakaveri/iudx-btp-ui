"use client";

import MapboxComponent from "@/ui/MapboxComponent/MapboxComponent";
import { Typography } from "@mui/material";
import ClosureButtons from "./ClosureButtons";
import TimeSliderComponent from "@/app/home/forecast/short_term_traffic_flow/TimeSliderComponent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectClosureData } from "./selectClosureData";
import Map, { Layer, MapRef, Source } from "react-map-gl";

import { getLayerProps } from "./getLayerProps";
import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import ClosedRoads from "./ClosedRoads";
import { MAPBOX_API_KEY } from "@/environments/environments";
import { MAPBOX_STYLES } from "@/lib/sync-video-player/constants";
import "mapbox-gl/dist/mapbox-gl.css";
import PopupComponent from "./PopupComponent";
import { calculateCentroid } from "@/utils/MapUtils/calculateCentroid";
import { centroid } from "./centroid";
import MapResetButton from "@/ui/MapElements/MapResetButton/MapResetButton";
import { onResetCallback } from "@/hooks/onReset";
import { setClosureLayers } from "@/lib/store/mapLayerSlice/mapLayerSlice";
import SelectedRoadsLegend from "./SelectedRoadsLegend";

export default function Page() {
	const mapStyle = useAppSelector((state) => state.mapStyle.value);
	const closure = useAppSelector((state) => state.mapLayer.closure);
	const closureLayers = useAppSelector(
		(state) => state.mapLayer.closureLayers
	);
	const timeValue = useAppSelector((state) => state.timeSlider.value);
	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();
	const [hoverInfo, setHoverInfo] = useState(null);

	const timestamps = selectClosureData(closure).timestamps;
	const values = selectClosureData(closure).values;
	const geojsons = selectClosureData(closure).geojsons;

	const layersArray = Array.from(
		{ length: geojsons.length },
		(v, i) => `new_loop-${i}`
	);

	const dispatch = useAppDispatch();

	const onClick = useCallback((event) => {
		const { features } = event;

		const hoveredFeature = features && features[0];
		const point = centroid(hoveredFeature.geometry);

		event.originalEvent.stopPropagation();
		setHoverInfo(
			hoveredFeature
				? {
						feature: hoveredFeature,
						x: point[1],
						y: point[0],
				  }
				: null
		);
	}, []);

	useEffect(() => {
		dispatch(
			setClosureLayers(
				Array.from(
					{ length: geojsons.length },
					(v, i) => `new_loop-${i}`
				).reduce((acc, key) => {
					acc[key] = true;
					return acc;
				}, {})
			)
		);
	}, [dispatch, geojsons.length]);

	return (
		<div>
			<Typography variant="h5">Road Closure</Typography>

			<Map
				mapboxAccessToken={MAPBOX_API_KEY}
				interactiveLayerIds={layersArray}
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
				onClick={onClick}
				style={{
					width: "100%",
					height: "70vh",
					margin: 0,
					padding: 0,
				}}
			>
				<MapResetButton
					onReset={onResetCallback(setHoverInfo, mapRef, [
						[13.021773235458033, 77.57145036562521],
					])}
				/>
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
								{...getLayerProps(
									values[timeValue][index],
									closureLayers[
										`new_loop-${index.toString()}`
									]
								)}
							/>
						</Source>
					);
				})}
				<ClosedRoads />

				{hoverInfo && (
					<PopupComponent
						popupInfo={hoverInfo}
						setPopupInfo={setHoverInfo}
					/>
				)}
				<SelectedRoadsLegend />
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
