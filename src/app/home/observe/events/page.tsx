import { Typography } from "@mui/material";
import TimeSeriesComponent from "./TimeSeriesComponent";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
	loading: () => <span>Loading...</span>,
});

export default function Page() {
	return (
		<div>
			<Typography variant="h5">Events</Typography>
			<VideoPlayer />
			<TimeSeriesComponent />
		</div>
	);
}
