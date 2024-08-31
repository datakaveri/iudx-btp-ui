import { Typography } from "@mui/material";

export default function Page() {
	return (
		<div>
			<Typography variant="h5">O-D Estimation</Typography>
			<iframe
				width="100%"
				height="700px"
				src="https://studio.foursquare.com/map/public/b7de031e-87e7-4d58-b072-4cdcb325f724/embed"
				frameborder="0"
				allowfullscreen
			></iframe>
		</div>
	);
}
