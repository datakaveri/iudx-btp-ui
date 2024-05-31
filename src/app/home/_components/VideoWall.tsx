"use client";

import SyncVideoPlayer from "@/lib/sync-video-player/SyncVideoPlayer";
import React, { useEffect, useState, useMemo } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VideoContainers from "./VideoContainers";
import { VideoPlayerOptions } from "@/lib/sync-video-player/main";

const VideoComponent = () => {
	const [ids] = useState([
		...[1, 2, 3, 4].map((_, index) => `video-${index}`),
	]);
	const [addedContainers, setAddedContainers] = useState(false);

	const syncVideoPlayer = useMemo(() => {
		return new SyncVideoPlayer({
			controls: false,
			loop: true,
			videoPlayers: [
				{
					id: "#video-0",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-15/Devasandra_Sgnl_JN_FIX_1_time_2024-05-15T07:30:02_003.mp4",
				},
				{
					id: "#video-1",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-15/MS_Ramaiah_JN_FIX_1_time_2024-05-15T07:30:02_003.mp4",
				},
				{
					id: "#video-2",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-17/Isro_JN_FIX_02_time_2024-05-17T07:39:56_003.mp4",
				},
				{
					id: "#video-3",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-18/SBI_Bnk_JN_FIX_1_time_2024-05-18T07:30:02_003.mp4",
				},
			],
		});
	}, []);

	useEffect(() => {
		if (!addedContainers) return;
		syncVideoPlayer.mount();
	}, [syncVideoPlayer, addedContainers]);

	const onPlay = async () => {
		await syncVideoPlayer.play();
	};

	const onPause = async () => {
		await syncVideoPlayer.pause();
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				flexWrap: "wrap",
			}}
		>
			<VideoContainers
				ids={ids}
				syncVideoPlayer={syncVideoPlayer}
				addedContainers={setAddedContainers}
			/>

			<div
				className="controlPanel"
				style={{
					height: "100px",
					padding: "20px",
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<button onClick={onPause}>
					<PauseIcon />
				</button>
				<button onClick={onPlay}>
					<PlayArrowIcon />
				</button>
			</div>
		</div>
	);
};

export default VideoComponent;
