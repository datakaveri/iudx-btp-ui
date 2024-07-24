"use client";

import { useAppSelector } from "@/lib/store/hooks";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { calculateProgress } from "./calculateProgress";
import screenfull from "screenfull";
import FullScreenButton from "./FullScreenButton";
import styles from "./styles.module.css";

const VideoPlayer = () => {
	const [duration, setDuration] = useState(0);
	const playerRef_1 = useRef(null);

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
		};

		handleValueChange();
	}, [brushEndTime, brushSelectedTime, brushStartTime, duration]);

	const handleDuration = (duration) => {
		setDuration(duration);
	};

	const handleFullScreen = (ref) => {
		if (screenfull.isEnabled) {
			screenfull.request(ref.current.wrapper);
		}
	};
	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				padding: "20px 0 40px 0",
			}}
		>
			<ReactPlayer
				width={320 * 2}
				height={180 * 2}
				ref={playerRef_1}
				url="https://safecityvideos.s3.ap-south-1.amazonaws.com/events/Site+2+Camera+6166+MS_Ramaiah_JN_FIX_2+MS_RAMAIAH_JUNCTION+1st+May+2024_h264.mp4"
				playing={true}
				volume={0.1}
				onDuration={handleDuration}
				controls={false}
			/>

			<div className={styles.kVideoFullScreenButtonsContainer}>
				<FullScreenButton
					handleFullScreen={() => handleFullScreen(playerRef_1)}
				/>
			</div>
		</div>
	);
};

export default VideoPlayer;
