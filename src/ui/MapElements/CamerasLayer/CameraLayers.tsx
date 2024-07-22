import React from "react";
import { Marker } from "react-map-gl";
import cameras from "@/data/cameras/cameras.json";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";

const CameraLayers = () => {
	return cameras.features.map((feature, index) => (
		<Marker
			key={index}
			latitude={feature.geometry.coordinates[1]}
			longitude={feature.geometry.coordinates[0]}
		>
			<VideoCameraFrontIcon
				color="info"
				sx={{
					cursor: "pointer",
					width: "20px",
				}}
			/>
		</Marker>
	));
};

export default CameraLayers;
