import * as React from "react";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import styles from "./styles.module.css";
import TabsComponent from "@/ui/TabsComponent/TabsComponent";
import { Metadata } from "next";

const routes = [
	"traffic_volume_scenario_simulation",
	"traffic_flow_restrictions",
];

export const metadata: Metadata = {
	title: "Scenario Analysis | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ width: "100%" }}>
			<TabsComponent rootPath="scenario_analysis" routes={routes} />
			<div className={styles.kModalBox}>{children}</div>
		</Box>
	);
}
