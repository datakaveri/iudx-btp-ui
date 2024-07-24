import { Typography } from "@mui/material";
import { Suspense } from "react";

export default function Page() {
	return (
		<div>
			<Typography variant="h5">Congestion</Typography>
			<Suspense fallback={<span>Loading...</span>}>
				<iframe
					width="100%"
					height="700px"
					seamless
					frameBorder="0"
					scrolling="no"
					src="https://analytics.iudx.org.in:13000/superset/dashboard/18/?permalink_key=GXxdao41ANl&standalone=1"
				/>
			</Suspense>
		</div>
	);
}
