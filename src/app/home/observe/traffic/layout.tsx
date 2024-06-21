import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth/next";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return session ? (
		<section>{children}</section>
	) : (
		<center>
			<Typography variant="h4">
				You must be logged in to view this content
			</Typography>
		</center>
	);
}
