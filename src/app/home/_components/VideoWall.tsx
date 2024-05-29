"use client";

import React, { useEffect, useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SyncVideoPlayer from "@/lib/SyncVideoPlayer";

const VideoWall = () => {
	const [ids] = useState(["video-0", "video-1", "video-2"]);

	const syncVideoPlayer = new SyncVideoPlayer({
		controls: false,
		loop: true,
		videoPlayers: [
			{
				id: "#video-0",
				initialSrc:
					"https://iudxcoedemo.s3.ap-south-1.amazonaws.com/BEL+Circuit/Site+2+Camera+5816++++++++Stn_HD_1++++++++STATION_JUNCTION+1st+May+2024.mp4",
			},
			{
				id: "#video-1",
				initialSrc:
					"https://iudxcoedemo.s3.ap-south-1.amazonaws.com/BEL+Circuit/Site+2+Camera+5816++++++++Stn_HD_1++++++++STATION_JUNCTION+1st+May+2024.mp4",
			},
			{
				id: "#video-2",
				initialSrc:
					"https://iudxcoedemo.s3.ap-south-1.amazonaws.com/BEL+Circuit/Site+2+Camera+5816++++++++Stn_HD_1++++++++STATION_JUNCTION+1st+May+2024.mp4",
			},
			{
				id: "#video-3",
				initialSrc:
					"https://iudxcoedemo.s3.ap-south-1.amazonaws.com/BEL+Circuit/Site+2+Camera+5816++++++++Stn_HD_1++++++++STATION_JUNCTION+1st+May+2024.mp4",
			},
			{
				id: "#video-4",
				initialSrc:
					"https://iudxcoedemo.s3.ap-south-1.amazonaws.com/BEL+Circuit/Site+2+Camera+5816++++++++Stn_HD_1++++++++STATION_JUNCTION+1st+May+2024.mp4",
			},
			// {
			// 	id: "#video-0",
			// 	initialSrc:
			// 		"https://static.videezy.com/system/resources/previews/000/050/817/original/002822-HD-SPECTRUM-COUNTDOWN-01.mp4",
			// },
			// {
			// 	id: "#video-1",
			// 	initialSrc:
			// 		"https://static.videezy.com/system/resources/previews/000/051/313/original/002823-HD-SPECTRUM-COUNTDOWN-02.mp4",
			// },
			// {
			// 	id: "#video-2",
			// 	initialSrc:
			// 		"https://static.videezy.com/system/resources/previews/000/049/943/original/002831-HD-COUNTDOWN-03.mp4",
			// },
			// {
			// 	id: "#video-3",
			// 	initialSrc:
			// 		"https://static.videezy.com/system/resources/previews/000/004/294/original/18_20Dragon_20Coaster_20Part_202.mp4",
			// },
		],
	});
	useEffect(() => {
		syncVideoPlayer.mount();

		return () => {};
	}, []);

	const onClick = async (index: number) => {
		await syncVideoPlayer.swapVideo(0, index);
	};

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value);
		await syncVideoPlayer.timeTo(value);
	};

	const onPlay = async () => {
		await syncVideoPlayer.play();
	};

	const onPause = async () => {
		await syncVideoPlayer.pause();
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				{ids.map((id, i) => (
					<div
						style={{
							margin: "20px",
							height: "180px",
						}}
						key={i}
						id={id}
						className="box"
						onClick={() => onClick(i)}
					/>
				))}
			</div>
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
				{/* <input
					type="range"
					min="0"
					max="60"
					defaultValue="0"
					className="slider"
					id="myRange"
					onInput={onChange}
				/> */}
			</div>
		</div>
	);
};

export default VideoWall;
