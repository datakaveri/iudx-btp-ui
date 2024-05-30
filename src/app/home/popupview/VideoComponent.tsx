"use client";

import SyncVideoPlayer from "@/lib/SyncVideoPlayer";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
interface Props {
	s3Links: string[];
}

const VideoComponent = ({ s3Links }: Props) => {
	const [ids] = useState(["video-0", "video-1", "video-2"]);

	let syncVideoPlayer: any = new SyncVideoPlayer({
		controls: false,
		loop: true,
		videoPlayers: [
			{
				id: "#video-0",
				initialSrc: s3Links[0],
			},
			{
				id: "#video-1",
				initialSrc: s3Links[1],
			},
			{
				id: "#video-2",
				initialSrc: s3Links[2],
			},
			{
				id: "#video-3",
				initialSrc:
					"https://safecityvideos.s3.ap-south-1.amazonaws.com/2024-05-21/18th_Crs_BsStp_JN_FIX_1_time_2024-05-21T07%3A30%3A02_000.mp4",
			},
		],
	});

	console.log(syncVideoPlayer);

	useEffect(() => {
		console.log("Component mounted");
		syncVideoPlayer.mount();

		return () => {
			syncVideoPlayer.$container = null;
		};
	}, [syncVideoPlayer]);

	const onClick = async (index: number) => {
		await syncVideoPlayer.swapVideo(0, index);
	};

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
			{ids.map((id, index) => (
				<div
					key={index}
					id={id}
					style={{
						margin: "20px",
						width: "160px",
						height: "90px",
					}}
					className="box"
					onClick={() => onClick(index)}
				/>
			))}

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
