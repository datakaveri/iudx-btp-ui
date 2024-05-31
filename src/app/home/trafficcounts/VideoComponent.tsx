"use client";

import SyncVideoPlayer from "@/lib/sync-video-player/SyncVideoPlayer";
import React, { useEffect, useState, useMemo } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VideoContainers from "./VideoContainers";
import { VideoPlayerOptions } from "@/lib/sync-video-player/main";
interface Props {
	s3Links: string[];
}

const VideoComponent = ({ s3Links }: Props) => {
	const [ids] = useState([...s3Links.map((_, index) => `video-${index}`)]);
	const [addedContainers, setAddedContainers] = useState(false);

	const syncVideoPlayer = useMemo(() => {
		const videoPlayers: VideoPlayerOptions[] = [];
		s3Links.map((link, index) => {
			videoPlayers.push({
				id: `#video-${index}`,
				initialSrc: link,
			});
		});

		return new SyncVideoPlayer({
			controls: false,
			loop: true,
			videoPlayers,
		});
	}, [s3Links]);

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
