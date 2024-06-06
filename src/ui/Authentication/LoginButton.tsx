import { MenuItem, Typography } from "@mui/material";
import React from "react";

const LoginButton = () => {
	return (
		<MenuItem>
			<a
				style={{
					textDecoration: "none",
					color: "inherit",
				}}
				href="/api/auth/login"
			>
				<Typography textAlign="center">Login</Typography>
			</a>
		</MenuItem>
	);
};

export default LoginButton;