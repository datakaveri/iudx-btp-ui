"use client";

import { onResetCallback } from "@/hooks/onReset";
import MapboxComponent from "@/ui/MapboxComponent/MapboxComponent";
import { Marker } from "react-map-gl";
import cameras from "@/data/cameras/cameras.json";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MapResetButton from "@/ui/MapElements/MapResetButton/MapResetButton";
import { MutableRefObject, Suspense, useRef, useState } from "react";
import {
	FullscreenControl,
	MapRef,
	NavigationControl,
	ScaleControl,
} from "react-map-gl";
import CameraPopupView from "./CameraPopupView";
import { CameraPopupInfo } from "@/types/CameraPopupInfo";
import { getIconColor } from "./getIconColor";
import LegendComponent from "./LegendComponent";

export default function Page() {
	const [cameraPopupInfo, setCameraPopupInfo] =
		useState<CameraPopupInfo | null>(null);
	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();

	return (
		<Suspense fallback={<>Loading...</>}>
			<MapboxComponent
				coordinates={[[13.0114048607646, 77.56908283576961]]}
				mapRef={mapRef}
				legend={<LegendComponent />}
			>
				<MapResetButton
					onReset={onResetCallback(setCameraPopupInfo, mapRef, [
						[13.0114048607646, 77.56908283576961],
					])}
				/>
				<FullscreenControl position="bottom-left" />
				<NavigationControl position="bottom-left" />
				<ScaleControl />

				{cameras.features.map((feature, index) => (
					<Marker
						key={index}
						latitude={feature.geometry.coordinates[1]}
						longitude={feature.geometry.coordinates[0]}
						onClick={(e) => {
							e.originalEvent.stopPropagation();
							setCameraPopupInfo(feature.properties);
						}}
					>
						<VideoCameraFrontIcon
							// color=""
							// color={getIconColor(feature.properties.Division)}
							style={{
								color: getIconColor(
									feature.properties.Division
								),
							}}
							sx={{
								cursor: "pointer",
								width: "20px",
							}}
						/>
					</Marker>
				))}

				{cameraPopupInfo !== null ? (
					<CameraPopupView
						cameraPopupInfo={cameraPopupInfo}
						setCameraPopupInfo={setCameraPopupInfo}
					/>
				) : null}
			</MapboxComponent>
		</Suspense>
	);
}
