import { Button, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Popup } from "react-map-gl";
import InsightsIcon from "@mui/icons-material/Insights";
import Link from "next/link";

interface Props {
	popupInfo: any;
	setPopupInfo: Dispatch<SetStateAction<null>>;
}

const PopupComponent = ({ popupInfo, setPopupInfo }: Props) => {
	return (
		<Popup
			anchor="left"
			// ? Positioning pop-up to the right
			longitude={popupInfo.y}
			latitude={popupInfo.x}
			onClose={() => setPopupInfo(null)}
		>
			<Typography variant="h6">Menu</Typography>
			<Link
				href={{
					pathname: `/home/scenario_analysis/event_simulation_result`,
				}}
			>
				<Button
					onClick={() => {}}
					size="small"
					variant="outlined"
					color="success"
					endIcon={<InsightsIcon />}
				>
					Simulate event
				</Button>
			</Link>
		</Popup>
	);
};

export default PopupComponent;
