import { MutableRefObject, useRef } from "react";

// This imports the functional component from the previous sample.
import VideoJS from "./VideoJS";

interface Props {
	playerRef: any;
}

export const VideoComponent = ({ playerRef }: Props) => {
	const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [
			{
				src: "https://ik.imagekit.io/ikmedia/example_video.mp4",
				type: "video/mp4",
			},
		],
	};

	const handlePlayerReady = (player) => {
		playerRef.current = player;

		// You can handle player events here, for example:
		player.on("waiting", () => {
			videojs.log("player is waiting");
		});

		player.on("dispose", () => {
			videojs.log("player will dispose");
		});
	};

	return (
		<>
			<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
		</>
	);
};
