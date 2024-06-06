"use client";

import { CongestionPopupInfo } from "@/types/CongestionPopupInfo";
import React, { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { Popup } from "react-map-gl";
import { Typography } from "@mui/material";
import "./CongestionPopupView.styles.css";

interface Props {
	congestionPopupInfo: CongestionPopupInfo;
	setCongestionPopupInfo: Dispatch<SetStateAction<CongestionPopupInfo>>;
}

const CongestionPopupView = ({
	congestionPopupInfo,
	setCongestionPopupInfo,
}: Props) => {
	return (
		<Popup
			anchor="bottom-left"
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
