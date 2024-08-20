import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
	updateClosure,
	updateZoomLevel,
} from "@/lib/store/mapLayerSlice/mapLayerSlice";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";

const CLosureButtons = () => {
	const dispatch = useAppDispatch();
	const closure = useAppSelector((state) => state.mapLayer.closure);

	return (
		<div>
			{" "}
			<ButtonGroup variant="outlined" aria-label="solid button group">
				<Button
					variant={closure === "original" ? "contained" : "outlined"}
					onClick={() => dispatch(updateClosure("original"))}
				>
					Original
				</Button>
				<Button
					variant={closure === "simulated" ? "contained" : "outlined"}
					onClick={() => dispatch(updateClosure("simulated"))}
				>
					Simulated
				</Button>
				<Button
					variant={
						closure === "gnn_predicted" ? "contained" : "outlined"
					}
					onClick={() => dispatch(updateClosure("gnn_predicted"))}
				>
					GNN Predicted
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default CLosureButtons;
