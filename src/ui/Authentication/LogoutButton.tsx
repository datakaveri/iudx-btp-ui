"use client";
import { MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
	return (
		<MenuItem
			onClick={() => {
				signOut();
			}}
		>
			Logout
		</MenuItem>
	);
};

export default LogoutButton;
