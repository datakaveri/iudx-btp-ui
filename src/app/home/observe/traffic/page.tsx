"use client";

import IIScLoopLayer from "@/ui/MapElements/IIScLoopLayer/IIScLoopLayer";
import MapboxComponent from "@/ui/MapboxComponent/MapboxComponent";
import {
	Fragment,
	MutableRefObject,
	Suspense,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { MapRef, Marker } from "react-map-gl";
import cameraDataWithPathsAndTimeSeries from "@/data/cameraDataWithPathsAndTimeSeries.json";
import congestionData from "@/data/congestion.json";
import Pin from "@/ui/MapElements/Pin/Pin";
import { CongestionPopupInfo } from "@/types/CongestionPopupInfo";
import CongestionPopupView from "@/ui/PopupComponent/CongestionPopupView";
import { Coordinate } from "@/types/Coordinate";
import MapResetButton from "@/ui/MapElements/MapResetButton/MapResetButton";
import { onResetCallback } from "@/hooks/onReset";

export default function Page() {
	const coordinates: number[][] = [];
	const cameraLocations = Object.keys(
		cameraDataWithPathsAndTimeSeries["2024-05-15"]
	);

	cameraLocations.map((cameraLocation, index) => {
		coordinates.push([
			+cameraDataWithPathsAndTimeSeries["2024-05-15"][cameraLocation]
				.latitude,
			+cameraDataWithPathsAndTimeSeries["2024-05-15"][cameraLocation]
				.longitude,
		]);
	});

	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();

	const [congestionPopupInfo, setCongestionPopupInfo] =
		useState<CongestionPopupInfo>(null);

	const pins = useMemo(
		() =>
			congestionData.map((congestionElement, index) => (
				<Marker
					key={`trafficMarker-${index}`}
					longitude={congestionElement.location.coordinates[1]}
					latitude={congestionElement.location.coordinates[0]}
					onClick={(e) => {
						e.originalEvent.stopPropagation();

						setCongestionPopupInfo(congestionElement);
					}}
				>
					<Pin />
				</Marker>
			)),
		[]
	);

	return (
		<Fragment>
			<Suspense fallback={<>Loading...</>}>
				<MapboxComponent mapRef={mapRef} coordinates={coordinates}>
					<MapResetButton
						onReset={onResetCallback(
							setCongestionPopupInfo,
							mapRef,
							coordinates
						)}
					/>
					{pins}
					{congestionPopupInfo !== null ? (
						<CongestionPopupView
							congestionPopupInfo={congestionPopupInfo}
							setCongestionPopupInfo={setCongestionPopupInfo}
						/>
					) : null}
					<IIScLoopLayer />
				</MapboxComponent>
			</Suspense>
		</Fragment>
	);
}
