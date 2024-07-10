import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { LegendComponentOption, SeriesOption } from "echarts";
import { TimeSeriesInterface } from "@/types/TimeSeriesInterface";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTimeseriesColorsList } from "@/lib/store/timeSliderSlice/timeSliderSlice";

interface Props {
	tsLinks: {};
}

const TimeseriesComponent = ({ tsLinks }: Props) => {
	const [timeSeriesData, setTimeSeriesData] =
		useState<TimeSeriesInterface[]>();
	const [loading, setLoading] = useState<boolean>(true);
	const [legendClear, setLegendClear] = useState(true);

	// ? useAppSelector causes rerendering
	const colorsList = useAppSelector((state) => state.timeSlider.colorsList);
	const timeValue = useAppSelector((state) => state.timeSlider.value);

	const eChartsRef = useRef(null);

	const timeSeriesArray: SeriesOption[] = [];
	const legend: LegendComponentOption[] = [];
	const selected = {};

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (Object.keys(tsLinks).length > 0) {
			const date = Object.keys(tsLinks)[0];
			axios.get(encodeURI(tsLinks[date])).then((res) => {
				setTimeSeriesData(res.data);
				setLoading(false);
			});
		}
	}, [tsLinks]);

	if (!loading) {
		timeSeriesData?.map((timeSeries, index) => {
			const trendData: [number, number][] = [];
			timeSeries.counts.map((count, index) => {
				trendData.push([
					+new Date(timeSeries.timestamps[index]),
					count,
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
		legend.map((legendElement, index) => {
			selected[legendElement.name] = colorsList[index].selected;
		});
	}

	const option: echarts.EChartsOption = {
		legend: {
			selected: selected,
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
				myTool2: {
					show: true,
					title: legendClear ? "Deselect All" : "Select All",
					icon: "image://https://echarts.apache.org/en/images/favicon.png",
					onclick: (params) => {
						const newState = colorsList.map(
							(colorElement, index) => {
								return {
									...colorElement,
									selected: !legendClear,
								};
							}
						);
						setLegendClear(!legendClear);
						dispatch(setTimeseriesColorsList(newState));
					},
				},
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
		dataZoom: [
			{
				type: "inside",
				start: 0,
				end: 4.5 * timeValue,
			},
			{
				start: 0,
				end: 4.5 * timeValue,
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
				ref={eChartsRef}
				option={option}
				style={{}}
				className="echart"
				onEvents={{
					legendselectchanged: (params) => {
						const newState = colorsList.map((colorElement, index) =>
							legend.findIndex(
								(legendItem) => legendItem.name === params.name
							) === index
								? {
										...colorElement,
										selected: !colorElement.selected,
								  }
								: colorElement
						);
						dispatch(setTimeseriesColorsList(newState));
					},
				}}
			/>
		</div>
	);
};

export default TimeseriesComponent;
