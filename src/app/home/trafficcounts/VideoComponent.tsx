"use client";

import SyncVideoPlayer from "@/lib/SyncVideoPlayer";
import React, { useEffect, useState, useMemo } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VideoContainers from "./VideoContainers";
interface Props {
	s3Links: string[];
}

const VideoComponent = ({ s3Links }: Props) => {
	const [ids] = useState(["video-0", "video-1", "video-2"]);
	const [addedContainers, setAddedContainers] = useState(false);

	const syncVideoPlayer = useMemo(() => {
		return new SyncVideoPlayer({
			controls: false,
			loop: true,
			videoPlayers: [
				{
					id: "#video-0",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-15/Kuvempu_Circle_FIX_1_time_2024-05-15T07:30:02_003.mp4",
				},
				{
					id: "#video-1",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-21/18th_Crs_BsStp_JN_FIX_1_time_2024-05-21T07%3A30%3A02_000.mp4",
				},
				{
					id: "#video-2",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-21/18th_Crs_BsStp_JN_FIX_1_time_2024-05-21T07%3A30%3A02_000.mp4",
				},
				{
					id: "#video-3",
					initialSrc:
						"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-21/18th_Crs_BsStp_JN_FIX_1_time_2024-05-21T07%3A30%3A02_000.mp4",
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
