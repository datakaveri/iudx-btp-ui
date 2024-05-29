"use client";

import { PopupInfo } from "@/app/dashboard/page";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useState,
} from "react";
import { Popup } from "react-map-gl";
import { CustomTabPanel } from "./CustomTabPanel";
import VideoComponent from "./VideoComponent";
import TimeseriesComponent from "./TimeseriesComponent";

interface Props {
	popupInfo: any;
	setPopupInfo: Dispatch<SetStateAction<PopupInfo | undefined | null>>;
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const PopupView = ({ popupInfo, setPopupInfo }: Props) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Popup
			style={{
				height: "500px",
				maxWidth: "500px",
			}}
			anchor="left"
			longitude={Number(popupInfo.longitude)}
			latitude={Number(popupInfo.latitude)}
			onClose={() => setPopupInfo(null)}
		>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: "Background",
					width: "500px",
				}}
			>
				<Typography variant="caption">{popupInfo.name}</Typography>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Video" {...a11yProps(0)} />
					<Tab label="Chart" {...a11yProps(1)} />
				</Tabs>
				<CustomTabPanel value={value} index={0}>
					<TimeseriesComponent />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<VideoComponent />
				</CustomTabPanel>
			</Box>
		</Popup>
	);
};

export default PopupView;
