import { MAPBOX_API_KEY } from "@/environments/environments";
import { MutableRefObject, ReactNode } from "react";
import Map, { MapRef } from "react-map-gl";
import { calculateCentroid } from "@/utils/MapUtils/calculateCentroid";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_STYLES } from "@/lib/sync-video-player/constants";
import { useAppSelector } from "@/lib/store/hooks";

interface Props {
	coordinates: number[][];
	children?: ReactNode;
	legend?: ReactNode;
	mapRef?: MutableRefObject<MapRef | undefined>;
}

const MapboxComponent = ({ coordinates, children, mapRef, legend }: Props) => {
	const mapStyle = useAppSelector((state) => state.mapStyle.value);

	return (
		<Map
			mapboxAccessToken={MAPBOX_API_KEY}
			initialViewState={{
				latitude: calculateCentroid(coordinates)[0],
				longitude: calculateCentroid(coordinates)[1],
				zoom: 13,
				bearing: 0,
				pitch: 0,
			}}
			mapStyle={MAPBOX_STYLES.find((el) => el.value === mapStyle)?.url}
			ref={mapRef}
			style={{
				width: "100%",
				height: "80vh",
				margin: 0,
				padding: 0,
			}}
		>
			{children}
			{legend}
		</Map>
	);
};

export default MapboxComponent;
