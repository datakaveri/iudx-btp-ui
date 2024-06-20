"use client";

import SyncVideoPlayer from "@/lib/sync-video-player/SyncVideoPlayer";
import React, { useEffect, useState, useMemo } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VideoContainers from "./VideoContainers";
import { VideoPlayerOptions } from "@/lib/sync-video-player/main";

const VideoComponent = () => {
	const [ids] = useState([
		...[0, 1, 2, 3, 4, 5].map((_, index) => `video-${index}`),
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
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/videos/Ayyappa+Temple+Fix+1+Time+2024-05-12T12-30-02+000.mp4",
				},
				{
					id: "#video-1",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/videos/Ms+Ramaiah+Jn+Fix+2+Time+2024-05-12T12-30-02+000.mp4",
				},
				{
					id: "#video-2",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/videos/Sty+Wll+Ldge+Fix+3+Time+2024-05-12T12-30-02+000.mp4",
				},
				{
					id: "#video-3",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/videos/Isro+Jn+Fix+01+Time+2024-05-12T12-30-02+000.mp4",
				},
				{
					id: "#video-4",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/videos/Devasandra+Sgnl+Jn+Fix+1+Time+2024-05-12T12-30-02+000.mp4",
				},
				{
					id: "#video-5",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/videos/Sbi+Bnk+Jn+Fix+1+Time+2024-05-12T12-30-02+000.mp4",
				},
				{
					id: "#video-6",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/jsondata/reid/videos/Kuvempu+Circle+Fix+1+Time+2024-05-12T12-30-02+000.mp4",
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
