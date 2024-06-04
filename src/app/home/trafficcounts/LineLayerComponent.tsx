import React, { useEffect, useState } from "react";
import { Layer, Marker, Source } from "react-map-gl";
import { getLayerProps } from "./getLayerProps";
import { PopupInfo } from "@/types/PopupInfo";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setTimestamps } from "@/lib/store/timeSliderSlice/timeSliderSlice";
import chroma from "chroma-js";
import Pin from "./Pin";

interface Props {
	popupInfo: PopupInfo;
}

interface PathInterface {
	counts: number[][];
	geometries: string[][];
	timestamps: string[];
}

const LineLayerComponent = ({ popupInfo }: Props) => {
	const [paths, setPaths] = useState<PathInterface>();
	const [loading, setLoading] = useState(true);
	const [colorsList, setColorsList] = useState<string[]>([]);

	const timeValue = useAppSelector((state) => state.timeSlider.value);

	const dispatch = useAppDispatch();

	console.log(colorsList);

	useEffect(() => {
		if (Object.keys(popupInfo.pathLinks).length > 0) {
			const date = Object.keys(popupInfo.pathLinks)[0];
			axios.get(encodeURI(popupInfo.pathLinks[date])).then((res) => {
				setPaths(res.data);
				setLoading(false);
				dispatch(setTimestamps(res.data.timestamps));
				setColorsList([
					...res.data.counts.map((_) => chroma.random().hex()),
				]);
				res.data.geometries.map((geo) => {
					console.log(
						JSON.parse(geo[0]).features[0].geometry
							.coordinates[0][0][0]
					);
				});
			});
		}
	}, [popupInfo.pathLinks, dispatch]);

	return (
		<>
			{!loading ? (
				<>
					{paths?.geometries[timeValue].map((path, index) => {
						return (
							<Source
								key={index}
								id={index.toString()}
								type="geojson"
								data={JSON.parse(path)}
							>
								<Layer
									id={index.toString()}
									{...getLayerProps({
										lineColors: colorsList[index],
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
						);
					})}
					{paths?.geometries[timeValue].map((path, index) => {
						return (
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
									{paths.counts[timeValue][index]}
								</span>
							</Marker>
						);
					})}
				</>
			) : null}
		</>
	);
};

export default LineLayerComponent;
