import { Grid } from "@mui/material";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import MapPanel from "./MapPanel/MapPanel";
import SidebarComponent from "./SidebarComponent.tsx/SidebarComponent";

export default function Page() {
	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} lg={2}>
					<SidebarComponent />
				</Grid>
				<Grid item xs={12} lg={5}>
					<MapPanel />
				</Grid>
				<Grid item xs={12} lg={5}>
					<VideoPlayer />
				</Grid>
			</Grid>
		</div>
	);
}
