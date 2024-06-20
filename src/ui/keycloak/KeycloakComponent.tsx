import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import LogoutButton from "../Authentication/LogoutButton";
import LoginButton from "../Authentication/LoginButton";
import { MenuItem, Typography } from "@mui/material";

const KeycloakComponent = async () => {
	const session = await getServerSession(authOptions);

	return (
		<>
			{session && (
				<MenuItem>
					<Typography>Hi {session.token?.name}</Typography>
				</MenuItem>
			)}
			{session ? <LogoutButton /> : <LoginButton />}
		</>
	);
};

export default KeycloakComponent;
