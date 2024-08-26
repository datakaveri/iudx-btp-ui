import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { Chip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
	clearClosureLayers,
	updateClosureLayers,
} from "@/lib/store/mapLayerSlice/mapLayerSlice";

const SelectedRoadsLegend = () => {
	const closureLayers = useAppSelector(
		(state) => state.mapLayer.closureLayers
	);

	const layersArray = Object.keys(closureLayers);
	const dispatch = useAppDispatch();

	const handleDelete = (closureLayer: string) => {
		dispatch(updateClosureLayers(closureLayer));
	};

	const handleClear = () => {
		dispatch(clearClosureLayers());
	};

	return (
		<div className={styles.kJunctionsLegendComponent}>
			<Typography variant="body2">Closed Roads</Typography>
			<Typography
				onClick={handleClear}
				sx={{
					cursor: "pointer",
				}}
				variant="caption"
			>
				Clear selections
			</Typography>
			<br />
			{layersArray.map((layer, index) => {
				return closureLayers[layer] === false ? (
					<Chip
						label={layer}
						key={index}
						onDelete={() => handleDelete(layer)}
					/>
				) : null;
			})}
		</div>
	);
};

export default SelectedRoadsLegend;
