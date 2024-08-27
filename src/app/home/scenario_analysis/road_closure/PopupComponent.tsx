import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateClosureLayers } from "@/lib/store/mapLayerSlice/mapLayerSlice";
import { Box, Button, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Popup } from "react-map-gl";

interface Props {
	popupInfo: any;
	setPopupInfo: Dispatch<SetStateAction<null>>;
}

const PopupComponent = ({ popupInfo, setPopupInfo }: Props) => {
	const dispatch = useAppDispatch();
	const closureLayers = useAppSelector(
		(state) => state.mapLayer.closureLayers
	);

	console.log(popupInfo.road);

	return (
		<Popup
			anchor="left"
			// ? Positioning pop-up to the right
			longitude={popupInfo.y}
			latitude={popupInfo.x}
			onClose={() => setPopupInfo(null)}
		>
			<Typography variant="h6">Menu</Typography>
			{closureLayers[popupInfo.feature.source] ? (
				<Button
					onClick={() => {
						dispatch(updateClosureLayers(popupInfo.road));
					}}
					size="small"
					variant="outlined"
					color="success"
				>
					Open Road
				</Button>
			) : (
				<Button
					onClick={() => {
						dispatch(updateClosureLayers(popupInfo.road));
					}}
					size="small"
					variant="outlined"
					color="error"
				>
					Close Road
				</Button>
			)}
		</Popup>
	);
};

export default PopupComponent;
