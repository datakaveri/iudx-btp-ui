import React from "react";
import VideoWall from "../_components/VideoWall";
import { Container, Grid, Typography } from "@mui/material";
import LeafletComponent from "../_components/LeafletComponent";

const page = () => {
	return (
		<>
			<Typography variant="h5">Vehicle Re-Identification</Typography>
			<Grid container spacing={2}>
				<Grid
					item
					xs={12}
					md={6}
					style={{
						height: "80vh",
					}}
				>
					{/* <DeckGLComponent /> */}
					<LeafletComponent />
				</Grid>
				<Grid item xs={12} md={6}>
					<VideoWall />
				</Grid>
			</Grid>
		</>
	);
};

export default page;
