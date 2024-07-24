"use client";

import React from "react";
import {
	Card,
	CardHeader,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";

import reIdData from "@/data/reid/reid_master_new.json";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectVehicleId } from "@/lib/store/reIdSlice/reIdSlice";

const SidebarComponent = () => {
	const vehicleIds = Object.keys(reIdData);

	const dispatch = useAppDispatch();
	const selectedVehicleId = useAppSelector((state) => state.reId.vehicleId);

	return (
		<Card variant="outlined">
			<CardHeader title="Vehicle ID" />
			<List
				sx={{
					width: "100%",
					height: "700px",
					bgcolor: "background.paper",
					position: "relative",
					overflow: "auto",
					"& ul": { padding: 0 },
				}}
				subheader={<li />}
			>
				{vehicleIds.map((id, index) => (
					<ListItem
						selected={id === selectedVehicleId}
						key={index}
						style={{
							padding: "0",
						}}
					>
						<ListItemButton
							onClick={() => dispatch(selectVehicleId(id))}
						>
							<ListItemText primary={`${id}`} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	);
};

export default SidebarComponent;
