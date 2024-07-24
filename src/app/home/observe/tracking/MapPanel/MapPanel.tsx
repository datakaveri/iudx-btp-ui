"use client";

import { useAppSelector } from "@/lib/store/hooks";
import MapboxComponent from "@/ui/MapboxComponent/MapboxComponent";
import React from "react";
import reIdData from "@/data/reid/reid_master_new.json";
import { Marker } from "react-map-gl";
import styles from "./styles.module.css";
import dayjs from "dayjs";
import Pin from "@/ui/MapElements/Pin/Pin";

const MapPanel = () => {
	const selectedVehicleId = useAppSelector((state) => state.reId.vehicleId);

	const data = reIdData[selectedVehicleId];

	const coordinates = [
		...Object.keys(reIdData).map((vehicleId) => [
			reIdData[vehicleId].latlons[0][1],
			reIdData[vehicleId].latlons[0][0],
		]),
	];

	return (
		<MapboxComponent coordinates={coordinates}>
			<Marker
				longitude={data.latlons[0][0]}
				latitude={data.latlons[0][1]}
				anchor="bottom"
			>
				<div className={styles.reIdMarkerContainer}>
					<span className={styles.reIdMarker}>
						{dayjs(data.timestamps[0]).format(
							"hh:mm:ss a, ddd DD MMM YY"
						)}
					</span>
					<span className={styles.reIdMarker}>
						{data.videos[0].seek}
					</span>
					<Pin />
				</div>
			</Marker>
			<Marker
				longitude={data.latlons[1][0]}
				latitude={data.latlons[1][1]}
				anchor="bottom"
			>
				<div className={styles.reIdMarkerContainer}>
					<span className={styles.reIdMarker}>
						{dayjs(data.timestamps[1]).format(
							"hh:mm:ss a, ddd DD MMM YY"
						)}
					</span>
					<span className={styles.reIdMarker}>
						{data.videos[1].seek}
					</span>
					<Pin />
				</div>
			</Marker>
		</MapboxComponent>
	);
};

export default MapPanel;
