/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Map, {
	FullscreenControl,
	MapRef,
	Marker,
	NavigationControl,
	ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
	MutableRefObject,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";

import data from "./data.json";
import Pin from "./Pin";
import { Button, IconButton, ThemeProvider } from "@mui/material";
import PopupComponent from "./PopupComponent";
import { theme } from "./materialTheme";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { MAPBOX_API_KEY } from "@/environments/environments";

export type PopupInfo = {
	name: string;
	latitude: number;
	longitude: number;
	video: string;
};

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

const page = () => {
	const [popupInfo, setPopupInfo] = useState<PopupInfo | undefined | null>();

	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();

	const onSelectCity = useCallback(({ longitude, latitude }: Coordinate) => {
		mapRef.current?.flyTo({
			zoom: 15,
			center: [longitude, latitude],
			duration: 2000,
		});
	}, []);

	const onReset = useCallback(() => {
		mapRef.current?.flyTo({
			zoom: 11.5,
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
			data.map((city, index) => (
				<Marker
					key={`marker-${index}`}
					longitude={city.longitude}
					latitude={city.latitude}
					anchor="bottom"
					onClick={(e) => {
						onSelectCity({
							latitude: city.latitude,
							longitude: city.longitude,
						});
						e.originalEvent.stopPropagation();
						setPopupInfo(city);
					}}
				>
					<Pin />
				</Marker>
			)),
		[onSelectCity]
	);

	const coordinates: number[][] = [];

	data.map((loc) => coordinates.push([loc.latitude, loc.longitude]));

	return (
		<ThemeProvider theme={theme}>
			<Map
				mapboxAccessToken={MAPBOX_API_KEY}
				initialViewState={{
					latitude: calculateCentroid(coordinates)[0],
					longitude: calculateCentroid(coordinates)[1],
					zoom: 11.5,
					bearing: 0,
					pitch: 0,
				}}
				ref={mapRef}
				mapStyle="mapbox://styles/mapbox/dark-v9"
				style={{
					width: "100%",
					height: "100vh",
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

				{pins}

				{popupInfo && (
					<PopupComponent
						popupInfo={popupInfo}
						setPopupInfo={setPopupInfo}
					/>
				)}
			</Map>
		</ThemeProvider>
	);
};

export default page;
