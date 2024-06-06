import { Box } from "@mui/material";
import { Fragment } from "react";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Fragment>{children}</Fragment>
				</Box>
			)}
		</div>
	);
}
