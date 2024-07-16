import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";

const page = () => {
	return (
		<div>
			<Typography variant="h4">
				Forecasting and Modelling for Urban Sustainability
			</Typography>
			<img
				src="https://ichef.bbci.co.uk/news/976/cpsprodpb/8CFC/production/_92729063_newairportroadnearhebbal.jpg" // Path to your image relative to the public directory
				alt="Traffic"
			/>
		</div>
	);
};

export default page;
