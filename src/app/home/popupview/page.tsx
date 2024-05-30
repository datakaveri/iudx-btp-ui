/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { MAPBOX_API_KEY } from "@/environments/environments";
import React, {
	Fragment,
	MutableRefObject,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import Map, {
	FullscreenControl,
	MapRef,
	Marker,
	NavigationControl,
	ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import data from "@/data/data.json";
import Pin from "./Pin";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PopupComponent from "./PopupView";
import cameraData from "@/data/cameraData.json";

function calculateCentroid(coordinates: number[][]) {
	let sumX = 0;
	let sumY = 0;

	for (let i = 0; i < coordinates.length; i++) {
		sumX += coordinates[i][0];
		sumY += coordinates[i][1];
	}

	const centroidX = sumX / coordinates.length;
	const centroidY = sumY / coordinates.length;

	return [centroidX, centroidY];
}

export interface Coordinate {
	longitude: number;
	latitude: number;
}

export type PopupInfo = {
	name: string;
	junctionname: string;
	latitude: string;
	longitude: string;
	s3links: string;
};

const page = () => {
	const coordinates: number[][] = [];
	const selectedDate = "2024-05-15";
	const cameraLocations = Object.keys(cameraData[selectedDate]);

	cameraLocations.map((cameraLocation, index) => {
		coordinates.push([
			+cameraData[selectedDate][cameraLocation].latitude,
			+cameraData[selectedDate][cameraLocation].longitude,
		]);
	});

	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();

	const [popupInfo, setPopupInfo] = useState<PopupInfo>();
	const [displayPins, setDisplayPins] = useState(true);

	const onSelectCity = useCallback(({ longitude, latitude }: Coordinate) => {
		mapRef.current?.flyTo({
			zoom: 15,
			// ? Positioning the pin to the left to make room for the popup
			center: [+longitude + 0.01, latitude],
			duration: 2000,
		});
	}, []);

	const onReset = useCallback(() => {
		setDisplayPins(true);
		mapRef.current?.flyTo({
			zoom: 13,
			center: [
				calculateCentroid(coordinates)[1],
				calculateCentroid(coordinates)[0],
			],
			duration: 2000,
		});
		setPopupInfo(null);
	}, []);

	const pins = useMemo(
		() =>
			cameraLocations.map((cameraLocation, index) => (
				<Marker
					key={`marker-${index}`}
					longitude={
						cameraData[selectedDate][cameraLocation].longitude
					}
					latitude={cameraData[selectedDate][cameraLocation].latitude}
					anchor="bottom"
					onClick={(e) => {
						setDisplayPins(false);
						onSelectCity({
							latitude:
								cameraData[selectedDate][cameraLocation]
									.latitude,
							longitude:
								cameraData[selectedDate][cameraLocation]
									.longitude,
						});
						e.originalEvent.stopPropagation();
						setPopupInfo(cameraData[selectedDate][cameraLocation]);
					}}
				>
					<Pin />
				</Marker>
			)),
		[]
	);

	return (
		<Fragment>
			<Map
				mapboxAccessToken={MAPBOX_API_KEY}
				initialViewState={{
					latitude: calculateCentroid(coordinates)[0],
					longitude: calculateCentroid(coordinates)[1],
					zoom: 13,
					bearing: 0,
					pitch: 0,
				}}
				mapStyle="mapbox://styles/mapbox/dark-v9"
				ref={mapRef}
				style={{
					width: "100%",
					height: "70vh",
					margin: 0,
					padding: 0,
				}}
			>
				<FullscreenControl position="top-left" />
				<NavigationControl position="top-left" />
				<ScaleControl />
				<div
					style={{
						padding: "20px",
						display: "flex",
						flexDirection: "row-reverse",
					}}
				>
					<IconButton
						style={{
							backgroundColor: "white",
						}}
						onClick={onReset}
						color="inherit"
					>
						<RestartAltIcon />
					</IconButton>
				</div>

				{displayPins && pins}

				{popupInfo && (
					<PopupComponent
						popupInfo={popupInfo}
						setPopupInfo={setPopupInfo}
					/>
				)}
			</Map>
		</Fragment>
	);
};

export default page;
