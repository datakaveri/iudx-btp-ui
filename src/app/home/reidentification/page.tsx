import React from "react";
import VideoWall from "../_components/VideoWall";
import { Grid } from "@mui/material";
import DeckGLComponent from "../_components/DeckGLComponent";

const page = () => {
	return (
		<Grid container spacing={2}>
			<Grid
				item
				xs={12}
				md={6}
				style={{
					height: "70vh",
				}}
			>
				<DeckGLComponent />
			</Grid>
			<Grid item xs={12} md={6}>
				<VideoWall />
			</Grid>
		</Grid>
	);
};

export default page;
