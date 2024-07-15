import React, { useEffect, useState } from "react";
import { Layer, Marker, Source } from "react-map-gl";
import { getLayerProps } from "./getLayerProps";
import { PopupInfo } from "@/types/PopupInfo";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
	ColorsListItem,
	setTimeseriesColorsList,
	setTimestamps,
} from "@/lib/store/timeSliderSlice/timeSliderSlice";
import chroma from "chroma-js";
import { PathInterface } from "@/types/PathInterface";

interface Props {
	popupInfo: PopupInfo;
}

const LineLayerComponent = ({ popupInfo }: Props) => {
	const [paths, setPaths] = useState<PathInterface>();
	const [loading, setLoading] = useState(true);

	const timeValue = useAppSelector((state) => state.timeSlider.value);
	const colorsList = useAppSelector((state) => state.timeSlider.colorsList);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (Object.keys(popupInfo.pathLinks).length > 0) {
			const date = Object.keys(popupInfo.pathLinks)[0];
			axios.get(encodeURI(popupInfo.pathLinks[date])).then((res) => {
				setPaths(res.data);
				setLoading(false);
				dispatch(setTimestamps(res.data.timestamps));
			});
		}
	}, [popupInfo.pathLinks, dispatch]);

	return (
		<>
			{!loading ? (
				<>
					{paths?.geometries[timeValue].map((path, index) => {
						return colorsList[index].selected ? (
							<Source
								key={index}
								id={index.toString()}
								type="geojson"
								data={JSON.parse(path)}
							>
								<Layer
									id={index.toString()}
									{...getLayerProps({
										lineColors: colorsList[index].color,
										values: paths.counts[timeValue],
										valueCounts:
											paths.counts[timeValue][index],
										min: Math.min(
											paths.counts[timeValue][index]
										),
										max: Math.max(
											paths.counts[timeValue][index]
										),
									})}
								/>
							</Source>
						) : null;
					})}
					{paths?.geometries[timeValue].map((path, index) => {
						return colorsList[index].selected ? (
							<Marker
								anchor="right"
								key={`countMarker-${index}`}
								longitude={
									+JSON.parse(path).features[0].geometry
										.coordinates[0][0][0]
								}
								latitude={
									+JSON.parse(path).features[0].geometry
										.coordinates[0][0][1]
								}
							>
								<span
									style={{
										padding: "2px",
										outline: "1px solid black",
										backgroundColor: "white",
									}}
								>
									{colorsList[index].path},{" "}
									{paths.counts[timeValue][index]}
								</span>
							</Marker>
						) : null;
					})}
				</>
			) : null}
		</>
	);
};

export default LineLayerComponent;
