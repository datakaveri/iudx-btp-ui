import * as React from "react";
import Box from "@mui/material/Box";
import { Fragment, ReactNode } from "react";
import TabsComponent from "@/ui/TabsComponent/TabsComponent";
import { Metadata } from "next";
import styles from "./styles.module.css";

const routes = [
	"short_term_traffic_flow",
	"short_term_traffic_flow_comparison",
	"o-d_estimation",
];

export const metadata: Metadata = {
	title: "Forecast | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ width: "100%" }}>
			<TabsComponent rootPath="forecast" routes={routes} />
			<div className={styles.kModalBox}>{children}</div>
		</Box>
	);
}
