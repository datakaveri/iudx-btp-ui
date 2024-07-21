import * as React from "react";
import Box from "@mui/material/Box";
import { ReactNode } from "react";
import TabsComponent from "@/ui/TabsComponent/TabsComponent";
import { Metadata } from "next";

const routes = ["junctions", "tracking", "sensors", "violations"];

export const metadata: Metadata = {
	title: "Observe | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ width: "100%" }}>
			<TabsComponent rootPath="observe" routes={routes} />
			<div
				style={{
					padding: "20px",
					margin: "10px",
					borderRadius: "20px",
					boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.25)",
				}}
			>
				{children}
			</div>
		</Box>
	);
}
