"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import reId_data from "@/data/reid/reid_master.json";

const VideoPlayer = () => {
	const [duration, setDuration] = useState(0);
	const playerRef_1 = useRef(null);
	const playerRef_2 = useRef(null);

	const selectedVehicleId = useAppSelector((state) => state.reId.vehicleId);

	useEffect(() => {
		const handleValueChange = () => {
			const progress_1 =
				(reId_data[selectedVehicleId].videos[0].seek / 100) * duration;
			const progress_2 =
				(reId_data[selectedVehicleId].videos[1].seek / 100) * duration;

			playerRef_1.current.seekTo(progress_1);
			playerRef_2.current.seekTo(progress_2);
		};

		handleValueChange();
	}, [duration, selectedVehicleId]);

	const handleDuration = (duration) => {
		setDuration(duration);
	};

	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "20px 0 40px 0",
			}}
		>
			<ReactPlayer
				width="90%"
				ref={playerRef_1}
				url={reId_data[selectedVehicleId].videos[0].video}
				playing={true}
				volume={0.1}
				onDuration={handleDuration}
				controls={false}
			/>

			<ReactPlayer
				width="90%"
				ref={playerRef_2}
				url={reId_data[selectedVehicleId].videos[1].video}
				playing={true}
				volume={0.1}
				onDuration={handleDuration}
				controls={false}
			/>
		</div>
	);
};

export default VideoPlayer;
