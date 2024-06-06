import { MenuItem, Typography } from "@mui/material";
import React from "react";

const LogoutButton = () => {
	return (
		<MenuItem>
			<a
				href="/api/auth/logout"
				style={{
					textDecoration: "none",
					color: "inherit",
				}}
			>
				<Typography textAlign="center">Logout</Typography>
			</a>
		</MenuItem>
	);
};

export default LogoutButton;
