/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { MAPBOX_API_KEY } from "@/environments/environments";
import React, {
	Fragment,
	MutableRefObject,
	useCallback,
	useEffect,
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
import cameraDataWithPaths from "@/data/cameraDataWithPaths.json";
import axios from "axios";

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
	pathLinks: object;
};

const page = () => {
	const coordinates: number[][] = [];
	const selectedDate = "2024-05-15";
	const cameraLocations = Object.keys(cameraDataWithPaths[selectedDate]);

	cameraLocations.map((cameraLocation, index) => {
		coordinates.push([
			+cameraDataWithPaths[selectedDate][cameraLocation].latitude,
			+cameraDataWithPaths[selectedDate][cameraLocation].longitude,
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

	useEffect(() => {
		axios
			.get(
				encodeURI(
					"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/paths/Site 2 Camera 5849        80ft_Rd_RMV_2nd_Stage_FIX_1        80_FEET_RD_POOJARI_LAYT_RMV_2ND_STG 1st May 2024.json"
				)
			)
			.then((res) => {
				console.log(res.data);
			});
	}, []);

	const pins = useMemo(
		() =>
			cameraLocations.map((cameraLocation, index) => (
				<Marker
					key={`marker-${index}`}
					longitude={
						cameraDataWithPaths[selectedDate][cameraLocation]
							.longitude
					}
					latitude={
						cameraDataWithPaths[selectedDate][cameraLocation]
							.latitude
					}
					anchor="bottom"
					onClick={(e) => {
						setDisplayPins(false);
						onSelectCity({
							latitude:
								cameraDataWithPaths[selectedDate][
									cameraLocation
								].latitude,
							longitude:
								cameraDataWithPaths[selectedDate][
									cameraLocation
								].longitude,
						});
						e.originalEvent.stopPropagation();
						setPopupInfo(
							cameraDataWithPaths[selectedDate][cameraLocation]
						);
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
