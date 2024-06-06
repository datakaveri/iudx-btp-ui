"use client";

import { CongestionPopupInfo } from "@/types/CongestionPopupInfo";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Popup } from "react-map-gl";
import "./CongestionPopupView.styles.css";
import { List, ListItem, Typography } from "@mui/material";

interface Props {
	congestionPopupInfo: CongestionPopupInfo;
	setCongestionPopupInfo: Dispatch<SetStateAction<CongestionPopupInfo>>;
}

const CongestionPopupView = ({
	congestionPopupInfo,
	setCongestionPopupInfo,
}: Props) => {
	console.log(congestionPopupInfo);

	return (
		<Popup
			anchor="left"
			// ? Positioning pop-up to the right
			longitude={+congestionPopupInfo?.location.coordinates[1]}
			latitude={+congestionPopupInfo?.location.coordinates[0]}
			onClose={() => setCongestionPopupInfo(null)}
		>
			<Fragment>
				<Typography variant="subtitle1">
					{congestionPopupInfo?.eventTitle}
				</Typography>
				<Typography variant="caption">
					{new Date(
						congestionPopupInfo?.observationDateTime
					).toLocaleString("en-IN")}
				</Typography>
			</Fragment>
		</Popup>
	);
};

export default CongestionPopupView;
