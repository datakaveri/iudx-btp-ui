"use client";
import Map, { Layer, Source, ViewStateChangeEvent } from "react-map-gl";
import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import { MAPBOX_API_KEY } from "@/environments/environments";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_STYLES } from "@/lib/sync-video-player/constants";
import { useAppSelector } from "@/lib/store/hooks";
import TimeSliderComponent from "@/app/home/forecast/short_term_traffic_flow/TimeSliderComponent";

import TopLabel from "./TopLabel";
import { getLayerProps } from "@/app/home/forecast/short_term_traffic_flow/getLayerProps";
import ControlPanel from "./control-panel";

import truth_data from "@/data/short_term_traffic_flow_comparison/original.json";
import prediction_data from "@/data/short_term_traffic_flow_comparison/predicted.json";

import styles from "./styles.module.css";
import VehicleClassDropdown from "./VehicleClassDropdown";

export type Mode = "side-by-side" | "split-screen";

const LeftMapStyle: CSSProperties = {
	width: "50%",
	height: "500px",
	borderRight: "2.5px solid black",
	border: "1px solid black",
};
const RightMapStyle: CSSProperties = {
	width: "50%",
	height: "500px",
	borderLeft: "2.5px solid black",
	border: "1px solid black",
};

const SideBySide = () => {
	const [viewState, setViewState] = useState({
		longitude: 77.5839566282995,
		latitude: 13.01459741683244,
		zoom: 12,
	});

	const [activeMap, setActiveMap] = useState<"left" | "right">("left");
	const width = typeof window === "undefined" ? 100 : window.innerWidth;
	const [mode, setMode] = useState<Mode>("split-screen");
	const mapStyle = useAppSelector((state) => state.mapStyle.value);

	const timeValue = useAppSelector((state) => state.timeSlider.value);

	const onLeftMoveStart = useCallback(() => setActiveMap("left"), []);
	const onRightMoveStart = useCallback(() => setActiveMap("right"), []);
	const onMove: any = useCallback(
		(e: ViewStateChangeEvent) => setViewState(e.viewState),
		[]
	);

	const leftMapPadding = useMemo(() => {
		return {
			left: mode === "split-screen" ? width / 2 : 0,
			top: 0,
			right: 0,
			bottom: 0,
		};
	}, [width, mode]);
	const rightMapPadding = useMemo(() => {
		return {
			right: mode === "split-screen" ? width / 2 : 0,
			top: 0,
			left: 0,
			bottom: 0,
		};
	}, [width, mode]);

	const vehicleClass = useAppSelector(
		(state) => state.timeSlider.shortTermTrafficFlowVehicleClass
	);

	const timed_truth_values = truth_data.values[vehicleClass];
	const timed_truth_timestamps = truth_data.timestamps;
	const timed_truth_geojsons = truth_data.geojsons;

	const timed_predictions_values = prediction_data.values[vehicleClass];
	const timed_predictions_geojsons = prediction_data.geojsons;

	const timedTruthFragment = useMemo(
		() =>
			timed_truth_geojsons.map((feature, index) => {
				return (
					<Source
						key={index.toString()}
						id={`new_loop-${index.toString()}`}
						type="geojson"
						data={feature.geometry}
					>
						<Layer
							id={`new_loop-${index.toString()}`}
							{...getLayerProps(
								timed_truth_values[timeValue][index]
							)}
						/>
					</Source>
				);
			}),
		[timeValue, timed_truth_geojsons, timed_truth_values]
	);

	const timedPredictionsFragment = useMemo(
		() =>
			timed_predictions_geojsons.map((feature, index) => {
				return (
					<Source
						key={index.toString()}
						id={`new_loop-${index.toString()}`}
						type="geojson"
						data={feature.geometry}
					>
						<Layer
							id={`new_loop-${index.toString()}`}
							{...getLayerProps(
								timed_predictions_values[timeValue][index]
							)}
						/>
					</Source>
				);
			}),
		[timeValue, timed_predictions_geojsons, timed_predictions_values]
	);

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Map
					reuseMaps
					id="left-map"
					{...viewState}
					padding={leftMapPadding}
					onMoveStart={onLeftMoveStart}
					onMove={activeMap === "left" && onMove}
					style={LeftMapStyle}
					mapStyle={
						MAPBOX_STYLES.find((el) => el.value === mapStyle)?.url
					}
					mapboxAccessToken={MAPBOX_API_KEY}
				>
					<TopLabel label="Ground Truth" />
					<div className={styles.kControlPanel}>
						<ControlPanel mode={mode} onModeChange={setMode} />
						<VehicleClassDropdown />
					</div>

					{timedTruthFragment}
				</Map>
				<Map
					reuseMaps
					id="right-map"
					{...viewState}
					padding={rightMapPadding}
					onMoveStart={onRightMoveStart}
					onMove={activeMap === "right" && onMove}
					style={RightMapStyle}
					mapStyle={
						MAPBOX_STYLES.find((el) => el.value === mapStyle)?.url
					}
					mapboxAccessToken={MAPBOX_API_KEY}
				>
					<TopLabel label={`Predictions`} />

					{timedPredictionsFragment}
				</Map>
			</div>
			<TimeSliderComponent timestamps={timed_truth_timestamps} />
		</>
	);
};

export default SideBySide;
