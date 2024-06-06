import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Fragment, ReactNode } from "react";
import Link from "next/link";
import TabsComponent from "@/ui/TabsComponent/TabsComponent";
import { Metadata } from "next";

const routes = ["traffic_flow_restrictions"];

export const metadata: Metadata = {
	title: "Scenario Analysis | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ width: "100%" }}>
			<TabsComponent rootPath="scenario_analysis" routes={routes} />
			<Fragment>{children}</Fragment>
		</Box>
	);
}
