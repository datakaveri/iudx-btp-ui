"use client";

import {
	AmbientLight,
	LightingEffect,
	PointLight,
	Position,
	TripsLayer,
} from "deck.gl";
import { Map, MapRef, Marker, useControl } from "react-map-gl";
import {
	MutableRefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_API_KEY } from "@/environments/environments";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox";
import data from "@/data/data.json";
import Pin from "./Pin";
import { IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { Color, Material } from "@deck.gl/core";
import { animate } from "popmotion";
import Button from "@mui/joy/Button";
import TuneIcon from "@mui/icons-material/TuneRounded";

const DATA_URL = {
	// eslint-disable-line
	TRIPS: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json", // eslint-disable-line
};

const ambientLight = new AmbientLight({
	color: [255, 255, 255],
	intensity: 1.0,
});

const pointLight = new PointLight({
	color: [255, 255, 255],
	intensity: 2.0,
	position: [-74.05, 40.7, 8000],
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

type Theme = {
	buildingColor: Color;
	trailColor0: Color;
	trailColor1: Color;
	material: Material;
	effects: [LightingEffect];
};

const DEFAULT_THEME: Theme = {
	buildingColor: [74, 80, 87],
	trailColor0: [253, 128, 93],
	trailColor1: [23, 184, 190],
	material: {
		ambient: 0.1,
		diffuse: 0.6,
		shininess: 32,
		specularColor: [60, 64, 70],
	},
	effects: [lightingEffect],
};

const landCover: Position[][] = [
	[
		[-74.0, 40.7],
		[-74.02, 40.7],
		[-74.02, 40.72],
		[-74.0, 40.72],
	],
];

type Trip = {
	vendor: number;
	path: Position[];
	timestamps: number[];
};

function DeckGLOverlay(props: MapboxOverlayProps) {
	const overlay = useControl(() => new MapboxOverlay(props));
	overlay.setProps(props);
	return null;
}

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

const DeckGLComponent = ({
	trips = DATA_URL.TRIPS,
	trailLength = 300,
	theme = DEFAULT_THEME,
	loopLength = 1800,
	animationSpeed = 1,
}: {
	trips?: string | Trip[];
	trailLength?: number;
	loopLength?: number;
	animationSpeed?: number;
	theme?: Theme;
}) => {
	const [time, setTime] = useState(0);

	useEffect(() => {
		const animation = animate({
			from: 0,
			to: loopLength,
			duration: (loopLength * 60) / animationSpeed,
			repeat: Infinity,
			onUpdate: setTime,
		});
		return () => animation.stop();
	}, [loopLength, animationSpeed]);

	const layers = [
		new TripsLayer<Trip>({
			id: "trips",
			data: trips,
			getPath: (d) => d.path,
			getTimestamps: (d) => d.timestamps,
			getColor: (d) =>
				d.vendor === 0 ? theme.trailColor0 : theme.trailColor1,
			opacity: 0.3,
			widthMinPixels: 2,
			rounded: true,
			trailLength,
			currentTime: time,
		}),
	];

	const mapRef: MutableRefObject<MapRef | undefined> = useRef<MapRef>();

	const onSelectCity = useCallback(({ longitude, latitude }: Coordinate) => {
		mapRef.current?.flyTo({
			zoom: 15,
			center: [longitude, latitude],
			duration: 2000,
		});
	}, []);

	const onReset = useCallback(() => {
		mapRef.current?.flyTo({
			zoom: 11.5,
			center: [
				calculateCentroid(coordinates)[1],
				calculateCentroid(coordinates)[0],
			],
			duration: 2000,
		});
		// setPopupInfo(null);
	}, []);

	const pins = useMemo(
		() =>
			data.map((city, index) => (
				<Marker
					key={`marker-${index}`}
					longitude={city.longitude}
					latitude={city.latitude}
					anchor="bottom"
					onClick={(e) => {
						onSelectCity({
							latitude: city.latitude,
							longitude: city.longitude,
						});
						e.originalEvent.stopPropagation();
					}}
				>
					<Pin />
				</Marker>
			)),
		[]
	);

	const coordinates: number[][] = [];

	data.map((loc) => coordinates.push([loc.latitude, loc.longitude]));

	const [open, setOpen] = useState(false);

	return (
		<>
			<Map
				ref={mapRef}
				mapboxAccessToken={MAPBOX_API_KEY}
				initialViewState={{
					latitude: calculateCentroid(coordinates)[0],
					longitude: calculateCentroid(coordinates)[1],
					zoom: 11.5,
					pitch: 45,
					bearing: 0,
				}}
				mapStyle="mapbox://styles/mapbox/dark-v9"
				style={{
					width: "100%",
					height: "100%",
					margin: 0,
					padding: 0,
				}}
			>
				<div
					style={{
						padding: "20px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
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
				{pins}
				<DeckGLOverlay
					layers={layers}
					effects={theme.effects}
					interleaved={true}
				/>
			</Map>
		</>
	);
};

export default DeckGLComponent;
