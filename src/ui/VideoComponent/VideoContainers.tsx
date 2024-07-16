import React, { useEffect } from "react";

interface Props {
	ids: string[];
	syncVideoPlayer: any;
	addedContainers: (set: boolean) => void;
}

const VideoContainers = ({ ids, syncVideoPlayer, addedContainers }: Props) => {
	const onClick = async (index: number) => {
		await syncVideoPlayer.swapVideo(0, index);
	};

	useEffect(() => {
		addedContainers(true);
	}, [addedContainers]);

	return (
		<>
			{ids.map((id, index) => (
				<div
					key={index}
					id={id}
					style={{
						margin: "5px",
						width: "576px",
						height: "324px",
					}}
					className="box"
					onClick={() => onClick(index)}
				/>
			))}
		</>
	);
};

export default VideoContainers;
