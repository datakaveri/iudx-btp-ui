"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { calculateProgress } from "./calculateProgress";

const VideoPlayer = () => {
	const [duration, setDuration] = useState(0);
	const playerRef_1 = useRef(null);
	const playerRef_2 = useRef(null);
	const playerRef_3 = useRef(null);

	const brushSelectedTime = useAppSelector((state) => state.brush.value);
	const brushStartTime = useAppSelector((state) => state.brush.startTime);
	const brushEndTime = useAppSelector((state) => state.brush.endTime);

	useEffect(() => {
		const handleValueChange = () => {
			const progress =
				(calculateProgress(
					brushStartTime,
					brushEndTime,
					brushSelectedTime
				) /
					100) *
				duration;
			playerRef_1.current.seekTo(progress);
			playerRef_2.current.seekTo(progress);
			playerRef_3.current.seekTo(progress);
		};

		handleValueChange();
	}, [brushEndTime, brushSelectedTime, brushStartTime, duration]);

	const handleDuration = (duration) => {
		setDuration(duration);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-evenly",
				padding: "20px 0 40px 0",
			}}
		>
			<ReactPlayer
				width={320 * 1.5}
				height={180 * 1.5}
				ref={playerRef_1}
				url="https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-15/MS_Ramaiah_JN_FIX_2_time_2024-05-15T07:30:02_003.mp4"
				playing={true}
				volume={0.1}
				onDuration={handleDuration}
				controls={false}
			/>
			<ReactPlayer
				width={320 * 1.5}
				height={180 * 1.5}
				ref={playerRef_2}
				url="https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-15/MS_Ramaiah_JN_FIX_1_time_2024-05-15T07:30:02_003.mp4"
				playing={true}
				volume={0.1}
				onDuration={handleDuration}
				controls={false}
			/>
			<ReactPlayer
				width={320 * 1.5}
				height={180 * 1.5}
				ref={playerRef_3}
				url="https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-15/MS_Ramaiah_JN_FIX_3_time_2024-05-15T07:30:02_003.mp4"
				playing={true}
				volume={0.1}
				onDuration={handleDuration}
				controls={false}
			/>
		</div>
	);
};

export default VideoPlayer;
