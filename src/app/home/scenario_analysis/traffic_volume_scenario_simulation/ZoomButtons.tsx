import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateZoomLevel } from "@/lib/store/mapLayerSlice/mapLayerSlice";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";

const ZoomButtons = () => {
	const dispatch = useAppDispatch();
	const zoomLevel = useAppSelector((state) => state.mapLayer.zoomLevel);

	return (
		<div>
			{" "}
			<ButtonGroup variant="outlined" aria-label="solid button group">
				<Button
					variant={zoomLevel === 1.5 ? "contained" : "outlined"}
					onClick={() => dispatch(updateZoomLevel(1.5))}
				>
					1.5x
				</Button>
				<Button
					variant={zoomLevel === 2 ? "contained" : "outlined"}
					onClick={() => dispatch(updateZoomLevel(2))}
				>
					2x
				</Button>
				<Button
					variant={zoomLevel === 3 ? "contained" : "outlined"}
					onClick={() => dispatch(updateZoomLevel(3))}
				>
					3x
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default ZoomButtons;
