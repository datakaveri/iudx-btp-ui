import { Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
import { LegendColor } from "./LegendColor";

interface Props {
	min: number;
	max: number;
	mean: number;
	std: number;
}

const LegendComponent = ({ min, max, mean, std }: Props) => {
	return (
		<div className={styles.kJunctionsLegendComponent}>
			<Typography variant="body1">Legend</Typography>
			<ul className={styles.kJunctionsLegendComponentList}>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<LegendColor color="green" /> {min} -
					{Number(mean - 0.625 * std).toFixed(2)}
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<LegendColor color="yellow" />{" "}
					{Number(mean - 0.625 * std).toFixed(2)} -{" "}
					{Number(mean).toFixed(2)}
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<LegendColor color="orange" /> {Number(mean).toFixed(2)} -
					{Number(mean + 0.625 * std).toFixed(2)}
				</li>
				<li className={styles.kJunctionsLegendComponentListItem}>
					<LegendColor color="red" />
					{Number(mean + 0.625 * std).toFixed(2)} - {max}
				</li>
			</ul>
		</div>
	);
};

export default LegendComponent;
