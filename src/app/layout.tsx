import { Box, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import { theme } from "./MaterialTheme";
import MiniDrawer from "./home/_components/SidebarComponent";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
	title: "BTP Dashboard",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				style={{
					margin: 0,
					padding: 0,
				}}
			>
				<UserProvider>
					<ThemeProvider theme={theme}>
						<Box sx={{ display: "flex", paddingTop: "70px" }}>
							<MiniDrawer />
							<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
								{children}
							</Box>
						</Box>
					</ThemeProvider>
				</UserProvider>
			</body>
		</html>
	);
}