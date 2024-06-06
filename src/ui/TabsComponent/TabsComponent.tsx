"use client";
import { Box, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}


function toTitleCase(str) {
    // Split the string by underscores
    let words = str.split("_");

    // Capitalize the first letter of each word and join them back
    let titleCaseStr = words
        .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");

    return titleCaseStr;
}

interface Props {
	rootPath: string;
	routes: string[];
}

const TabsComponent = ({ rootPath, routes }: Props) => {
	const pathname = usePathname();

	return (
		<Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
			<Tabs aria-label="basic tabs example">
				{routes.map((route, index) => (
					<Link
						className={
							pathname === `/home/${rootPath}/${route}`
								? styles.TabLinkSelected
								: ""
						}
						href={`/home/${rootPath}/${route}`}
						key={index}
					>
						<Tab label={toTitleCase(route)} {...a11yProps(index)} />
					</Link>
				))}
			</Tabs>
		</Box>
	);
};

export default TabsComponent;
