"use client";

import React, { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { Popup } from "react-map-gl";
import { Typography } from "@mui/material";
import { CameraPopupInfo } from "@/types/CameraPopupInfo";

interface Props {
	cameraPopupInfo: CameraPopupInfo;
	setCameraPopupInfo: Dispatch<SetStateAction<CameraPopupInfo | null>>;
}

const CameraPopupView = ({ cameraPopupInfo, setCameraPopupInfo }: Props) => {
	return (
		<Popup
			anchor="bottom-left"
			// ? Positioning pop-up to the right
			longitude={+cameraPopupInfo.LONG}
			latitude={+cameraPopupInfo.LAT}
			onClose={() => setCameraPopupInfo(null)}
		>
			<Fragment>
				<Typography variant="subtitle1">
					{cameraPopupInfo.Name}
				</Typography>
				<Typography variant="caption">
					Junction Code: {cameraPopupInfo.Junction_Code}
				</Typography>
				<br />
				<Typography variant="caption">
					Division: {cameraPopupInfo.Division}
				</Typography>
				<br />
				<Typography variant="caption">
					Police Station Constituency:{" "}
					{cameraPopupInfo.Police_Station_Constituency}
				</Typography>
				<br />
				<Typography variant="caption">
					PTZ Camera: {cameraPopupInfo.PTZ_Camera}
				</Typography>
				<br />
				<Typography variant="caption">
					Fixed Camera: {cameraPopupInfo.Fixed_Camera}
				</Typography>
				<br />
				<Typography variant="caption">
					HD Camera: {cameraPopupInfo.HD_Camera}
				</Typography>
			</Fragment>
		</Popup>
	);
};

export default CameraPopupView;
