"use client";
import Map, { Layer, Source, ViewStateChangeEvent } from "react-map-gl";
import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import { MAPBOX_API_KEY } from "@/environments/environments";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_STYLES } from "@/lib/sync-video-player/constants";
import { useAppSelector } from "@/lib/store/hooks";
import TimeSliderComponent from "@/app/home/forecast/short_term_traffic_flow/TimeSliderComponent";

import timed_predictions from "@/data/timed_predictions_NEW_sorted.json";
import timed_truth from "@/data/timed_ground_truth_NEW_sorted.json";
import TopLabel from "./TopLabel";
import { getLayerProps } from "../short_term_traffic_flow/getLayerProps";
import {
	computeMean,
	computeStandardDeviation,
} from "../short_term_traffic_flow/computeMeanAndStandardDeviation";

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

function addHour(timeStr: string) {
	// Split the time string into hours and minutes
	const [hours, minutes] = timeStr.split(":").map(Number);

	// Create a new Date object and set the time
	const date = new Date();
	date.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, milliseconds

	// Add one hour
	date.setHours(date.getHours() + 1);

	// Get the new hours and minutes
	const newHours = date.getHours().toString().padStart(2, "0");
	const newMinutes = date.getMinutes().toString().padStart(2, "0");

	// Return the new time string
	return `${newHours}:${newMinutes}`;
}

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

	const timed_predictions_timestamps = timed_predictions.timestamps;

	const timed_predictions_geojsons = timed_predictions.geojsons.slice(
		0,
		1000
	);
	const timed_predictions_values = timed_predictions.values;

	const timed_truth_geojsons = timed_truth.geojsons.slice(0, 1000);
	const timed_truth_values = timed_truth.values;

	return (
		<>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Map
					id="left-map"
					maxZoom={14}
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
					<TopLabel
						label="Ground Truth"
						value={timed_predictions_timestamps[timeValue]}
					/>

					{timed_truth_geojsons.map((feature, index) => {
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
										timed_predictions_values[timeValue][
											index
										],
										Math.max(
											...timed_predictions_values[
												timeValue
											]
										),
										Math.min(
											...timed_predictions_values[
												timeValue
											]
										),
										computeMean(
											timed_predictions_values[timeValue]
										),
										computeStandardDeviation(
											timed_predictions_values[timeValue]
										)
									)}
								/>
							</Source>
						);
					})}
				</Map>
				<Map
					maxZoom={14}
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
					<TopLabel
						label="Predictions"
						value={timed_predictions_timestamps[timeValue]}
					/>

					{timed_predictions_geojsons.map((feature, index) => {
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
										timed_predictions_values[timeValue][
											index
										],
										Math.max(
											...timed_predictions_values[
												timeValue
											]
										),
										Math.min(
											...timed_predictions_values[
												timeValue
											]
										),
										computeMean(
											timed_predictions_values[timeValue]
										),
										computeStandardDeviation(
											timed_predictions_values[timeValue]
										)
									)}
								/>
							</Source>
						);
					})}
				</Map>
			</div>
			<TimeSliderComponent timestamps={timed_predictions_timestamps} />
		</>
	);
};

export default SideBySide;
