import { Typography } from "@mui/material";
import React from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Pin from "@/ui/MapElements/Pin/Pin";
import styles from "./styles.module.css";

const LegendComponent = () => {
	return (
		<div className={styles.kJunctionsLegendComponent}>
			<Typography variant="body1">Legend</Typography>
			<ul className={styles.kJunctionsLegendComponentList}>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon color="info" /> Cameras
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<Pin />
					Accident Locations
				</li>
			</ul>
		</div>
	);
};

export default LegendComponent;
