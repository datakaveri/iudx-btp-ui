import { MAPBOX_API_KEY, MAPBOX_STYLE } from "@/environments/environments";
import { MutableRefObject, ReactNode } from "react";
import Map, { MapRef } from "react-map-gl";
import { calculateCentroid } from "../../utils/MapUtils/calculateCentroid";

interface Props {
	coordinates: number[][];
	children: ReactNode;
	mapRef: MutableRefObject<MapRef | undefined>;
}

const MapboxComponent = ({ coordinates, children, mapRef }: Props) => {
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
			mapStyle={MAPBOX_STYLE}
			ref={mapRef}
			style={{
				width: "100%",
				height: "80vh",
				margin: 0,
				padding: 0,
			}}
		>
			{children}
		</Map>
	);
};

export default MapboxComponent;
