"use client";
import { MenuItem } from "@mui/material";
import { signIn } from "next-auth/react";

const LoginButton = () => {
	return (
		<MenuItem
			onClick={() => {
				signIn("keycloak");
			}}
		>
			Login
		</MenuItem>
	);
};

export default LoginButton;
