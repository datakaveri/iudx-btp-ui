import { Typography } from "@mui/material";
import React from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Pin from "@/ui/MapElements/Pin/Pin";
import styles from "./styles.module.css";
import { getIconColor } from "./getIconColor";

const LegendComponent = () => {
	return (
		<div className={styles.kJunctionsLegendComponent}>
			<Typography variant="body1">Legend</Typography>
			<ul className={styles.kJunctionsLegendComponentList}>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("NORTH"),
						}}
					/>{" "}
					North
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("EAST"),
						}}
					/>{" "}
					East
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("WEST"),
						}}
					/>{" "}
					West
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("SOUTH"),
						}}
					/>{" "}
					South
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("CENTRAL"),
						}}
					/>{" "}
					Central
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("NORTH-EAST"),
						}}
					/>{" "}
					North-East
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("SOUTH-EAST"),
						}}
					/>{" "}
					South-East
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<VideoCameraFrontIcon
						style={{
							color: getIconColor("WHITEFIELD"),
						}}
					/>{" "}
					Whitefield
				</li>
			</ul>
		</div>
	);
};

export default LegendComponent;
