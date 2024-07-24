import * as React from "react";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import TabsComponent from "@/ui/TabsComponent/TabsComponent";
import { Metadata } from "next";
import styles from "./styles.module.css";

const routes = [
	"overview",
	"junctions",
	"tracking",
	"violations",
	"congestion",
];

export const metadata: Metadata = {
	title: "Observe | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ width: "100%" }}>
			<TabsComponent rootPath="observe" routes={routes} />
			<div className={styles.kModalBox}>{children}</div>
		</Box>
	);
}
