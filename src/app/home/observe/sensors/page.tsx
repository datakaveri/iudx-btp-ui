"use client";

import MapboxComponent from "@/ui/MapboxComponent/MapboxComponent";

import data from "@/data/timed_predictions.json";
import { Layer, Source } from "react-map-gl";
import { getLayerProps } from "./getLayerProps";
import TimeSliderComponent from "./TimeSliderComponent";
import { useAppSelector } from "@/lib/store/hooks";

export default function Page() {
	const newTimestamps = data.timestamps;
	const timeValue = useAppSelector((state) => state.timeSlider.value);

	const newData = data.geojsons.slice(0, 1000);
	const newValues = data.values;

	console.log(newTimestamps);

	return (
		<div>
			<MapboxComponent
				coordinates={[[13.021773235458033, 77.57145036562521]]}
			>
				{newData.map((feature, index) => {
					return (
						<Source
							key={index.toString()}
							id={`new_loop-${index.toString()}`}
							type="geojson"
							data={feature.geometry}
						>
							<Layer
								id={`new_loop-${index.toString()}`}
								{...getLayerProps(newValues[timeValue][index])}
							/>
						</Source>
					);
				})}
			</MapboxComponent>
			<TimeSliderComponent timestamps={newTimestamps} />
		</div>
	);
}
