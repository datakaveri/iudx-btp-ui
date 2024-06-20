"use client";

import { PopupInfo } from "@/types/PopupInfo";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, {
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useState,
} from "react";
import { Popup } from "react-map-gl";
import { CustomTabPanel } from "./CustomTabPanel";
import TimeseriesComponent from "../TimeSeriesComponent/TimeseriesComponent";
import dynamic from "next/dynamic";

const VideoComponent = dynamic(
	() => import("../VideoComponent/VideoComponent"),
	{
		ssr: false,
	}
);
interface Props {
	popupInfo: PopupInfo;
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
			// ? Positioning pop-up to the right
			longitude={+popupInfo.longitude + 0.00025}
			latitude={Number(popupInfo.latitude)}
			onClose={() => setPopupInfo(null)}
		>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: "Background",
					width: "750px",
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
					<TimeseriesComponent tsLinks={popupInfo.tsLinks} />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<VideoComponent s3Links={popupInfo.s3links} />
				</CustomTabPanel>
			</Box>
		</Popup>
	);
};

export default PopupView;
