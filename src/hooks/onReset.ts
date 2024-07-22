/* eslint-disable react-hooks/rules-of-hooks */
import { CameraPopupInfo } from "@/types/CameraPopupInfo";
import { CongestionPopupInfo } from "@/types/CongestionPopupInfo";
import { PopupInfo } from "@/types/PopupInfo";
import { calculateCentroid } from "@/utils/MapUtils/calculateCentroid";
import { Dispatch, MutableRefObject, useCallback } from "react";
import { MapRef } from "react-map-gl";

export const onResetCallback = (
	setPopupInfo:
		| Dispatch<React.SetStateAction<PopupInfo>>
		| Dispatch<React.SetStateAction<CongestionPopupInfo>>
		| Dispatch<React.SetStateAction<CameraPopupInfo | null>>,
	mapRef: MutableRefObject<MapRef | undefined>,
	coordinates: number[][],
	setDisplayPins?: Dispatch<React.SetStateAction<boolean>>
) => {
	const onReset = useCallback(() => {
		if (setDisplayPins) setDisplayPins(true);
		mapRef.current?.flyTo({
			zoom: 13,
			center: [
				calculateCentroid(coordinates)[1],
				calculateCentroid(coordinates)[0],
			],
			duration: 2000,
		});
		setPopupInfo(null);
	}, [coordinates, mapRef, setDisplayPins, setPopupInfo]);

	return onReset;
};
