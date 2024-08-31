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
					Without Closure
				</Button>
				<Button
					variant={closure === "simulated" ? "contained" : "outlined"}
					onClick={() => dispatch(updateClosure("simulated"))}
				>
					With Closure
				</Button>
				<Button
					variant={
						closure === "gnn_predicted" ? "contained" : "outlined"
					}
					onClick={() => dispatch(updateClosure("gnn_predicted"))}
				>
					Predicted
				</Button>
				<Button
					variant={
						closure === "difference" ? "contained" : "outlined"
					}
					onClick={() => dispatch(updateClosure("difference"))}
				>
					Difference
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default CLosureButtons;
