import React from "react";
import styles from "./styles.module.css";
import { Button, Chip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
	clearClosureLayers,
	updateClosureLayers,
} from "@/lib/store/mapLayerSlice/mapLayerSlice";
import Link from "next/link";
import InsightsIcon from "@mui/icons-material/Insights";
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
				return closureLayers[layer] ? (
					<Chip
						label={layer}
						key={index}
						onDelete={() => handleDelete(layer)}
					/>
				) : null;
			})}
			<br />
			{layersArray.length > 0 ? (
				<Link href={`/home/scenario_analysis/road_closure_result`}>
					<Button variant="outlined" endIcon={<InsightsIcon />}>
						Analyze
					</Button>
				</Link>
			) : null}
		</div>
	);
};

export default SelectedRoadsLegend;
