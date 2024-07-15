import { Metadata } from "next";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
	title: "Junctions | AI Based Demand Forecasting",
};

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