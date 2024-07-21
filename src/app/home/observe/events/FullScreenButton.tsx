import React from "react";
import styles from "./styles.module.css";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

interface Props {
	handleFullScreen: () => void;
}

const FullScreenButton = ({ handleFullScreen }: Props) => {
	return (
		<div className={styles.kVideoFullScreenButton}>
			<button
				className={styles.kVideoFullScreenButtonStyles}
				onClick={handleFullScreen}
			>
				<FullscreenIcon />
			</button>
		</div>
	);
};

export default FullScreenButton;
