import React from "react";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setMapStyle } from "@/lib/store/mapStyleSlice/mapStyleSlice";
import { MAPBOX_STYLES } from "@/lib/sync-video-player/constants";
import styles from "./styles.module.css";

const MapSelector = () => {
	const dispatch = useAppDispatch();
	const mapStyle = useAppSelector((state) => state.mapStyle.value);

	const handleChange = (event: SelectChangeEvent) => {
		dispatch(
			setMapStyle(
				event.target.value as "Light" | "Dark" | "Satellite" | "Streets"
			)
		);
	};

	return (
		<div className={styles.kMapSelectorBox}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Map Style</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={mapStyle}
					label="Map Style"
					onChange={handleChange}
				>
					{MAPBOX_STYLES.map((mapStyle, index) => {
						return (
							<MenuItem key={index} value={mapStyle.value}>
								<div className={styles.kMapSelectorBoxMenuItem}>
									<Image
										src={mapStyle.image}
										alt="Pic"
										className={styles.kMapSelectorBoxImage}
										quality={100}
									/>
									<span>{mapStyle.value}</span>
								</div>
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
};

export default MapSelector;
