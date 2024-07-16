import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const Footer = () => {
	return (
		<Box
			sx={{
				bgcolor: "primary.main",
				color: "white",
				py: 3,
				mt: "auto",
				textAlign: "center",
				margin: "0px",
			}}
		>
			<Container maxWidth="lg">
				<Typography variant="body1">
					© {new Date().getFullYear()} Your Company. All rights
					reserved.
				</Typography>
				<Typography variant="body2">
					<Link href="/privacy-policy" color="inherit">
						Privacy Policy
					</Link>
					{" | "}
					<Link href="/terms-of-service" color="inherit">
						Terms of Service
					</Link>
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer;
