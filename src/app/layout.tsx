import { Box, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import { theme } from "./MaterialTheme";
import MiniDrawer from "../ui/MiniDrawer/MiniDrawer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import NextTopLoader from "nextjs-toploader";

import "./index.css";
import StoreProvider from "./StoreProvider";
import KeycloakComponent from "@/ui/keycloak/KeycloakComponent";

export const metadata: Metadata = {
	title: "AI Based Demand Forecasting",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
					integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
					crossorigin="anonymous"
				/>
			</head>
			<body
				style={{
					margin: 0,
					padding: 0,
				}}
			>
				<StoreProvider>
					<ThemeProvider theme={theme}>
						<NextTopLoader color="white" showSpinner={false} />
						<Box sx={{ display: "flex", paddingTop: "70px" }}>
							<MiniDrawer>
								<KeycloakComponent />
							</MiniDrawer>
							<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
								{children}
							</Box>
						</Box>
					</ThemeProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
