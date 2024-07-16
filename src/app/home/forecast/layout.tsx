import * as React from "react";
import Box from "@mui/material/Box";
import { Fragment, ReactNode } from "react";
import TabsComponent from "@/ui/TabsComponent/TabsComponent";
import { Metadata } from "next";

const routes = [
	"short_term_intersection",
	"short_term_traffic_flow",
	"short_term_traffic_flow_comparison",
	"od_estimation",
];

export const metadata: Metadata = {
	title: "Forecast | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ width: "100%" }}>
			<TabsComponent rootPath="forecast" routes={routes} />
			<Fragment>{children}</Fragment>
		</Box>
	);
}
