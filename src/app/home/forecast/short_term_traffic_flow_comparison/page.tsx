import { Typography } from "@mui/material";
import SideBySide from "./side-by-side";

export default function Page() {
	return (
		<div>
			<Typography variant="h6">
				Short Term Traffic Flow Comparison
			</Typography>
			<SideBySide />
		</div>
	);
}
