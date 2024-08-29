"use client";

import { setBounds, setSelectedTime } from "@/lib/store/brushSlice/brushSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { TimeSeriesInterface } from "@/types/TimeSeriesInterface";
import VehicleClassDropdownComponent, {
	vehicleClasses,
} from "@/ui/TimeSeriesComponent/VehicleClassDropdownComponent";
import { Card } from "@mui/material";
import axios from "axios";
import { LegendComponentOption, SeriesOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";

interface Props {
	timeValue: number;
	setTimestamp: (value: number) => void;
}

const TimeSeriesComponent = () => {
	const timeSeriesURL =
		"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/classwisetimeseries/Site 2 Camera 6166        MS_Ramaiah_JN_FIX_2        MS_RAMAIAH_JUNCTION 1st May 2024.json";
	const [timeSeriesData, setTimeSeriesData] =
		useState<TimeSeriesInterface[]>();
	const [loading, setLoading] = useState<boolean>(true);

	const colorsList = useAppSelector((state) => state.timeSlider.colorsList);

	const timeSeriesArray: SeriesOption[] = [];
	const legend: LegendComponentOption[] = [];

	useEffect(() => {
		loading &&
			axios.get(encodeURI(timeSeriesURL)).then((res) => {
				setTimeSeriesData(res.data);
				setLoading(false);
			});
	}, [loading]);

	const dispatch = useAppDispatch();
	const vehicleClass = useAppSelector(
		(state) => state.timeSlider.vehicleClass
	);

	if (!loading) {
		dispatch(
			setBounds({
				startTime: +new Date(timeSeriesData[0].timestamps[0]),
				endTime: +new Date(
					timeSeriesData[0].timestamps[
						timeSeriesData[0].timestamps.length - 1
					]
				),
			})
		);

		timeSeriesData?.map((timeSeries, index) => {
			const trendData: [number, number][] = [];
			timeSeries.counts.map((count, index) => {
				trendData.push([
					+new Date(timeSeries.timestamps[index]),
					count[vehicleClasses.indexOf(vehicleClass)],
				]);
			});
			legend.push({
				name: timeSeries.segment,
				itemStyle: {
					color: colorsList[index].color,
				},
			});
			timeSeriesArray.push({
				name: timeSeries.segment,
				type: "line",
				smooth: 0.3,
				showSymbol: false,
				data: trendData,
				lineStyle: {
					width: 0.5,
					color: colorsList[index].color,
				},
			});
		});
	}

	const option: echarts.EChartsOption = {
		legend: {
			left: "left",
			type: "scroll",
			data: legend,
			icon: "square",
		},
		tooltip: {
			trigger: "axis",
		},
		toolbox: {
			orient: "vertical",
			top: "center",
			left: "right",
			feature: {
				saveAsImage: {},
				dataView: {},
				magicType: {
					type: ["line", "bar"],
				},
				brush: {
					type: ["lineX", "clear"],
				},
			},
		},
		brush: {
			xAxisIndex: "all",
			yAxisIndex: "all",
			brushLink: "all",
			outOfBrush: {
				colorAlpha: 0.1,
			},
			brushMode: "single",
			brushStyle: {
				borderWidth: 0.5,
				borderColor: "black",
			},
		},
		xAxis: [
			{
				type: "time",
				splitLine: {
					show: false,
				},
			},
		],
		yAxis: [
			{
				splitLine: {
					show: false,
				},
				axisLine: {
					show: true,
				},
			},
		],
		series: timeSeriesArray,
		graphic: [
			{
				type: "text",
				rotation: 1.5706,
				z: 100,
				left: "7%",
				top: "middle",
				style: {
					fill: "#333",
					width: 220,
					overflow: "break",
					text: "Counts",
					font: "23px Microsoft YaHei",
				},
			},
			{
				type: "text",
				z: 100,
				left: "center",
				top: "bottom",
				style: {
					fill: "#333",
					width: 220,
					overflow: "break",
					text: "Time",
					font: "20px Microsoft YaHei",
				},
			},
		],
	};

	return (
		<Card variant="outlined">
			<VehicleClassDropdownComponent />
			<ReactEcharts
				option={option}
				style={{
					height: "400px",
				}}
				className="echart"
				onEvents={{
					brush: (params) => {
						params.command ??
							dispatch(
								setSelectedTime(+params.areas[0].coordRange[0])
							);
					},
				}}
			/>
		</Card>
	);
};

export default TimeSeriesComponent;
