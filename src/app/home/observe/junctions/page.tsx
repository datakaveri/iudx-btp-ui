/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, {
	Fragment,
	MutableRefObject,
	Suspense,
	useCallback,
	useEffect,
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
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PopupComponent from "@/ui/PopupComponent/PopupView";
// import cameraDataWithPathsAndTimeSeries from "@/data/junctions/data_outs.json";
import cameraDataWithPathsAndTimeSeries from "@/data/junctions/data_outs_2.json";

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
import IIScLoopLayer from "@/ui/MapElements/IIScLoopLayer/IIScLoopLayer";
import { CongestionPopupInfo } from "@/types/CongestionPopupInfo";
import CongestionPopupView from "@/ui/PopupComponent/CongestionPopupView";
import Pin from "@/ui/MapElements/Pin/Pin";
import LegendComponent from "./LegendComponent";

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
					<VideoCameraFrontIcon
						color="info"
						sx={{
							cursor: "pointer",
							width: "20px",
						}}
					/>
				</Marker>
			)),
		[cameraLocations, onSelectCity, selectedDateFromAppSelector]
	);

	// ? Congestion pop up
	const [congestionPopupInfo, setCongestionPopupInfo] =
		useState<CongestionPopupInfo>(null);

	const [congestionData, setCongestionData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch("/api/getDataset");
			const resJson = await result.json();
			setCongestionData(resJson);
		};

		fetchData();
	}, []);

	return (
		<Fragment>
			<Typography variant="h5">Traffic Counts</Typography>
			<Suspense fallback={<>Loading...</>}>
				<MapboxComponent
					coordinates={[[13.0114048607646, 77.56908283576961]]}
					mapRef={mapRef}
					legend={<LegendComponent />}
				>
					<MapResetButton
						onReset={onResetCallback(
							setPopupInfo,
							mapRef,
							[[13.0114048607646, 77.56908283576961]],
							setDisplayPins
						)}
					/>
					<FullscreenControl position="bottom-left" />
					<NavigationControl position="bottom-left" />
					<ScaleControl />

					{displayPins && pins}

					{displayPins && <IIScLoopLayer />}

					{popupInfo && (
						<>
							<PopupComponent
								popupInfo={popupInfo}
								setPopupInfo={setPopupInfo}
							/>
							<LineLayerComponent popupInfo={popupInfo} />
						</>
					)}

					{congestionData ? (
						congestionData.results.map(
							(congestionElement, index) => (
								<Marker
									key={`trafficMarker-${index}`}
									longitude={
										congestionElement.location
											.coordinates[1]
									}
									latitude={
										congestionElement.location
											.coordinates[0]
									}
									onClick={(e) => {
										e.originalEvent.stopPropagation();

										setCongestionPopupInfo(
											congestionElement
										);
									}}
								>
									<Pin />
								</Marker>
							)
						)
					) : (
						<span>Loading...</span>
					)}
					{congestionPopupInfo !== null ? (
						<CongestionPopupView
							congestionPopupInfo={congestionPopupInfo}
							setCongestionPopupInfo={setCongestionPopupInfo}
						/>
					) : null}
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
