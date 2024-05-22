"use client";

import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React, {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useState,
} from "react";
import { Popup } from "react-map-gl";
import { CustomTabPanel } from "./CustomTabPanel";
import dynamic from "next/dynamic";
import { PopupInfo } from "./page";

const TimeseriesComponent = dynamic(() => import("./TimeseriesComponent"), {
	loading: () => <span>Loading...</span>,
});
const VideoComponent = dynamic(() => import("./Video"), {
	ssr: false,
	loading: () => <span>Loading...</span>,
});

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

interface Props {
	popupInfo: any;
	setPopupInfo: Dispatch<SetStateAction<PopupInfo | undefined | null>>;
}

const PopupComponent = ({ popupInfo, setPopupInfo }: Props) => {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Popup
			maxWidth="500px"
			style={{
				width: "500px",
			}}
			anchor="top"
			longitude={Number(popupInfo.longitude)}
			latitude={Number(popupInfo.latitude)}
			onClose={() => setPopupInfo(null)}
		>
			<Box sx={{ borderBottom: 1, borderColor: "Background" }}>
				<Typography variant="caption">{popupInfo.name}</Typography>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Video" {...a11yProps(0)} />
					<Tab label="Chart" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<VideoComponent src={popupInfo.video} title={popupInfo.name} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<TimeseriesComponent />
			</CustomTabPanel>
		</Popup>
	);
};

export default PopupComponent;
