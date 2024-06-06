import React, { Suspense } from "react";
import VideoWall from "@/ui/SyncVideoPlayers/VideoWall";
import { Grid, Typography } from "@mui/material";
import LeafletComponent from "@/ui/LeafletComponent/LeafletComponent";

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
					<Suspense fallback={<>Loading...</>}>
						<LeafletComponent />
					</Suspense>
				</Grid>
				<Grid item xs={12} md={6}>
					<VideoWall />
				</Grid>
			</Grid>
		</>
	);
};

export default page;
