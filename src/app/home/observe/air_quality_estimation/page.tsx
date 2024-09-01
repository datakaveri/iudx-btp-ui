import { Typography } from "@mui/material";

export default function Page() {
	return (
		<div>
			<Typography variant="h5">Air Quality Estimation</Typography>
			<iframe
				width="100%"
				height="700px"
				src="https://studio.foursquare.com/map/public/5cda3131-1a45-49dc-9f6f-785e0eb5a216/embed"
				frameborder="0"
				allowfullscreen
			></iframe>
		</div>
	);
}
