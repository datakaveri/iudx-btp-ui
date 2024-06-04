import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Fragment, ReactNode } from "react";
import Link from "next/link";

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const routes = [
	"events",
	"junctions",
	"sensors",
	"tracking",
	"traffic",
	"violations",
];

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs aria-label="basic tabs example">
					{routes.map((route, index) => (
						<Link href={`/home/observe/${route}`} key={index}>
							<Tab label={route} {...a11yProps(index)} />
						</Link>
					))}
				</Tabs>
			</Box>
			<Fragment>{children}</Fragment>
		</Box>
	);
}
