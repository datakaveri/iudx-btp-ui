"use client";

import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.timeline/dist/Timeline";
import "leaflet.timeline/dist/TimelineSliderControl";
import axios from "axios";
import "./timeline.css";

const LeafletComponent = () => {
	const [vehicles, setVehicles] = useState();
	const [dataLoaded, setDataLoaded] = useState(false);

	useEffect(() => {
		const getData = async () => {
			const windsData = await axios.get(
				`https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/vehicle_reid_data.geojson`
			);
			await setVehicles(windsData.data);
		};

		getData().then(() => {
			setDataLoaded(true);
		});
	}, []);

	useEffect(() => {
		let map = L.map("map").setView(
			[13.034387252510989, 77.56911730174228],
			16
		);
		L.tileLayer(
			"https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
			{
				maxZoom: 18,
				attribution:
					'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
			}
		).addTo(map);

		var slider = L.timelineSliderControl({
			formatOutput: function (date) {
				return new Date(date).toDateString();
			},
			showTicks: false,
			duration: 200000,
		});
		map.addControl(slider);

		function numberToColor(number) {
			const hue = number % 360; // Ensure the hue is within 0-359
			const saturation = 100; // Full saturation
			const lightness = 50; // Medium lightness

			return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		}

		var pointTimeline = L.timeline(vehicles, {
			pointToLayer: function (data, latlng) {
				return L.circleMarker(latlng, {
					radius: 10,
					color: numberToColor(data.properties.vehicle_id),
					fillColor: numberToColor(data.properties.vehicle_id),
				});
			},
		});
		pointTimeline.addTo(map);

		slider.addTimelines(pointTimeline);

		return () => {
			map?.off();
			map?.remove();
		};
	}, [dataLoaded, vehicles]);

	return (
		<div
			style={{
				width: "100%",
				height: "700px",
			}}
			id="map"
		></div>
	);
};

export default LeafletComponent;
