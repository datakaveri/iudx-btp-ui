/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, {
	Fragment,
	MutableRefObject,
	Suspense,
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
import Pin from "@/ui/MapElements/Pin/Pin";
import PopupComponent from "@/ui/PopupComponent/PopupView";
import cameraDataWithPathsAndTimeSeries from "@/data/cameraDataWithPathsAndTimeSeries.json";
import LineLayerComponent from "@/ui/MapElements/LineLayerComponent/LineLayerComponent";
import TimeSliderComponent from "@/ui/TimeSliderComponent/TimeSliderComponent";
import { Typography } from "@mui/material";
import DatePickerComponent from "@/ui/DatePickerComponent/DatePickerComponent";
import MapboxComponent from "@/ui/MapboxComponent/MapboxComponent";
import { PopupInfo } from "@/types/PopupInfo";
import MapResetButton from "@/ui/MapElements/MapResetButton/MapResetButton";
import { useAppSelector } from "@/lib/store/hooks";
import { selectedDate } from "@/lib/store/timeSliderSlice/timeSliderSlice";
import { onResetCallback } from "@/hooks/onReset";
import { Coordinate } from "@/types/Coordinate";

const page = () => {
	const coordinates: number[][] = [];
	const selectedDateFromAppSelector = useAppSelector(selectedDate);
	const cameraLocations = Object.keys(
		cameraDataWithPathsAndTimeSeries[selectedDateFromAppSelector]
	);

	cameraLocations.map((cameraLocation, index) => {
		coordinates.push([
			+cameraDataWithPathsAndTimeSeries[selectedDateFromAppSelector][
				cameraLocation
			].latitude,
			+cameraDataWithPathsAndTimeSeries[selectedDateFromAppSelector][
				cameraLocation
			].longitude,
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

	const pins = useMemo(
		() =>
			cameraLocations.map((cameraLocation, index) => (
				<Marker
					key={`marker-${index}`}
					longitude={
						cameraDataWithPathsAndTimeSeries[
							selectedDateFromAppSelector
						][cameraLocation].longitude
					}
					latitude={
						cameraDataWithPathsAndTimeSeries[
							selectedDateFromAppSelector
						][cameraLocation].latitude
					}
					anchor="bottom"
					onClick={(e) => {
						setDisplayPins(false);
						onSelectCity({
							latitude:
								cameraDataWithPathsAndTimeSeries[
									selectedDateFromAppSelector
								][cameraLocation].latitude,
							longitude:
								cameraDataWithPathsAndTimeSeries[
									selectedDateFromAppSelector
								][cameraLocation].longitude,
						});
						e.originalEvent.stopPropagation();
						setPopupInfo(
							cameraDataWithPathsAndTimeSeries[
								selectedDateFromAppSelector
							][cameraLocation]
						);
					}}
				>
					<Pin />
				</Marker>
			)),
		[cameraLocations, onSelectCity, selectedDateFromAppSelector]
	);

	return (
		<Fragment>
			<Typography variant="h5">Traffic Counts</Typography>
			<Suspense fallback={<>Loading...</>}>
				<MapboxComponent coordinates={coordinates} mapRef={mapRef}>
					<MapResetButton
						onReset={onResetCallback(
							setPopupInfo,
							mapRef,
							coordinates,
							setDisplayPins
						)}
					/>
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
			</Suspense>

			{popupInfo === null ? (
				<DatePickerComponent />
			) : (
				<TimeSliderComponent />
			)}
		</Fragment>
	);
};

export default page;
