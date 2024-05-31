import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { LegendComponentOption, SeriesOption } from "echarts";

interface Props {
	tsLinks: {};
}

interface TimeSeriesInterface {
	segment: string;
	counts: number[];
	timestamps: string[];
}

const TimeseriesComponent = ({ tsLinks }: Props) => {
	const [timeSeriesData, setTimeSeriesData] =
		useState<TimeSeriesInterface[]>();
	const [loading, setLoading] = useState<boolean>(true);

	const timeSeriesArray: SeriesOption[] = [];
	const legend = [];

	useEffect(() => {
		if (Object.keys(tsLinks).length > 0) {
			const date = Object.keys(tsLinks)[0];
			axios.get(encodeURI(tsLinks[date])).then((res) => {
				console.log(res.data);
				axios.get(encodeURI(tsLinks[date])).then((res) => {
					console.log(res.data);
				});

				setTimeSeriesData(res.data);
				setLoading(false);
			});
		}
	}, [tsLinks]);

	if (!loading) {
		timeSeriesData?.map((timeSeries) => {
			console.log(timeSeries.segment);
			const trendData: [number, number][] = [];
			timeSeries.counts.map((count, index) => {
				trendData.push([
					+new Date(timeSeries.timestamps[index]),
					count,
				]);
			});
			legend.push(timeSeries.segment);
			timeSeriesArray.push({
				name: timeSeries.segment,
				type: "line",
				smooth: 0.3,
				showSymbol: false,
				data: trendData,
				lineStyle: {
					width: 0.5,
				},
			});
		});
	}

	const option: echarts.EChartsOption = {
		legend: {
			data: legend,
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
		dataZoom: [
			{
				type: "inside",
				start: 15,
				end: 45,
			},
			{
				start: 15,
				end: 45,
			},
		],
		series: timeSeriesArray,
		graphic: [
			{
				type: "text",
				rotation: 1.5706,
				z: 100,
				left: "1.5%",
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
		<div>
			<ReactEcharts
				option={option}
				style={{
					width: "700px",
					height: "500px",
				}}
				className="echart"
			/>
		</div>
	);
};

export default TimeseriesComponent;
