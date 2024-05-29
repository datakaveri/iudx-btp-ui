"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#093664",
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				root: {
					backgroundColor: "#093664",
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: "15px",
					textTransform: "none",
				},
			},
		},
		MuiListItemButton: {
			variants: [
				{
					props: { selected: true },
					style: {
						backgroundColor: "black",
					},
				},
			],
		},
	},
});
