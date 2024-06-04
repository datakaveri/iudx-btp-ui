/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, {
	Fragment,
	MutableRefObject,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	FullscreenControl,
	MapRef,
	Marker,
	NavigationControl,
	ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";
import IconButton from "@mui/material/IconButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PopupComponent from "./PopupView";
import cameraDataWithPathsAndTimeSeries from "@/data/cameraDataWithPathsAndTimeSeries.json";
import LineLayerComponent from "./LineLayerComponent";
import TimeSliderComponent from "../../../ui/TimeSliderComponent/TimeSliderComponent";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { Typography } from "@mui/material";
import DatePickerComponent from "../../../ui/DatePickerComponent/DatePickerComponent";
import MapboxComponent from "../../../ui/MapboxComponent/MapboxComponent";
import { calculateCentroid } from "./calculateCentroid";
import { Coordinate } from "@/types/Coordinate";
import { PopupInfo } from "@/types/PopupInfo";

const page = () => {
	const coordinates: number[][] = [];
	const selectedDate = "2024-05-15";
	const cameraLocations = Object.keys(
		cameraDataWithPathsAndTimeSeries[selectedDate]
	);

	cameraLocations.map((cameraLocation, index) => {
		coordinates.push([
			+cameraDataWithPathsAndTimeSeries[selectedDate][cameraLocation]
				.latitude,
			+cameraDataWithPathsAndTimeSeries[selectedDate][cameraLocation]
				.longitude,
		]);
	});

	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();

	const [popupInfo, setPopupInfo] = useState<PopupInfo>(null);
	const [displayPins, setDisplayPins] = useState(true);

	const onSelectCity = useCallback(({ longitude, latitude }: Coordinate) => {
		mapRef.current?.flyTo({
			zoom: 19,
			// ? Positioning the pin to the left to make room for the popup
			center: [+longitude + 0.00025, latitude],
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
						cameraDataWithPathsAndTimeSeries[selectedDate][
							cameraLocation
						].longitude
					}
					latitude={
						cameraDataWithPathsAndTimeSeries[selectedDate][
							cameraLocation
						].latitude
					}
					anchor="bottom"
					onClick={(e) => {
						setDisplayPins(false);
						onSelectCity({
							latitude:
								cameraDataWithPathsAndTimeSeries[selectedDate][
									cameraLocation
								].latitude,
							longitude:
								cameraDataWithPathsAndTimeSeries[selectedDate][
									cameraLocation
								].longitude,
						});
						e.originalEvent.stopPropagation();
						setPopupInfo(
							cameraDataWithPathsAndTimeSeries[selectedDate][
								cameraLocation
							]
						);
					}}
				>
					<Pin />
				</Marker>
			)),
		[]
	);

	return (
		<Provider store={store}>
			<Fragment>
				<Typography variant="h5">Traffic Counts</Typography>
				<MapboxComponent coordinates={coordinates} mapRef={mapRef}>
					<div
						style={{
							padding: "20px",
							display: "flex",
							flexDirection: "row",
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
					<FullscreenControl position="bottom-left" />
					<NavigationControl position="bottom-left" />
					<ScaleControl />

					{displayPins && pins}

					{popupInfo && (
						<>
							<PopupComponent
								popupInfo={popupInfo}
								setPopupInfo={setPopupInfo}
							/>
							<LineLayerComponent popupInfo={popupInfo} />
						</>
					)}
				</MapboxComponent>

				{popupInfo === null ? (
					<DatePickerComponent />
				) : (
					<TimeSliderComponent />
				)}
			</Fragment>
		</Provider>
	);
};

export default page;
