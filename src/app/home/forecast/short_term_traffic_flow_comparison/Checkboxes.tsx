import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateLayers } from "@/lib/store/mapLayerSlice/mapLayerSlice";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { SyntheticEvent } from "react";

const Checkboxes = () => {
	const dispatch = useAppDispatch();
	const selectMetroLayer = useAppSelector(
		(state) => state.mapLayer.metroLayer
	);
	const selectWardsLayer = useAppSelector(
		(state) => state.mapLayer.wardsLayer
	);

	const handleChange = (event: SyntheticEvent) => {
		dispatch(updateLayers(event.target.name));
	};

	return (
		<div>
			<FormGroup>
				<FormControlLabel
					name="metroLayer"
					onChange={handleChange}
					control={<Checkbox checked={selectMetroLayer} />}
					label="Metro Layer"
				/>
				<FormControlLabel
					name="wardsLayer"
					onChange={handleChange}
					control={<Checkbox checked={selectWardsLayer} />}
					label="Wards Layer"
				/>
			</FormGroup>
		</div>
	);
};

export default Checkboxes;
