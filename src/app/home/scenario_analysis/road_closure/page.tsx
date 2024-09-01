"use client";

import { Typography } from "@mui/material";
import { useAppSelector } from "@/lib/store/hooks";
import Map, { MapRef } from "react-map-gl";

import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { MAPBOX_API_KEY } from "@/environments/environments";
import { MAPBOX_STYLES } from "@/lib/sync-video-player/constants";
import "mapbox-gl/dist/mapbox-gl.css";
import HMTLayer from "./hmtLayer";
import MapResetButton from "@/ui/MapElements/MapResetButton/MapResetButton";
import { onResetCallback } from "@/hooks/onReset";
import PopupComponent from "./PopupComponent";
import { calculateCentroid } from "@/utils/MapUtils/calculateCentroid";
import SelectedRoadsLegend from "./SelectedRoadsLegend";

export default function Page() {
	const mapStyle = useAppSelector((state) => state.mapStyle.value);

	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();
	const [hoverInfo, setHoverInfo] = useState(null);

	const onClick = useCallback((event) => {
		const { features } = event;

		const hoveredFeature = features && features[0];

		const point = calculateCentroid(hoveredFeature.geometry.coordinates);

		event.originalEvent.stopPropagation();

		setHoverInfo(
			hoveredFeature
				? {
						feature: hoveredFeature,
						x: point[1],
						y: point[0],
						road: hoveredFeature.properties.name,
				  }
				: null
		);
	}, []);

	return (
		<div>
			<Typography variant="h5">Road Closure</Typography>

			<Map
				reuseMaps
				mapboxAccessToken={MAPBOX_API_KEY}
				interactiveLayerIds={["CV Raman Road", "MS Ramaiah Road"]}
				initialViewState={{
					latitude: 13.021773235458033,
					longitude: 77.57145036562521,
					zoom: 14.5,
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
				<SelectedRoadsLegend />
				{hoverInfo && (
					<PopupComponent
						popupInfo={hoverInfo}
						setPopupInfo={setHoverInfo}
					/>
				)}
				<HMTLayer />
			</Map>
		</div>
	);
}
