import { createTheme } from "@mui/material";

export const theme = createTheme({
	components: {
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: "15px",
					textTransform: "none",
				},
			},
		},
	},
});
