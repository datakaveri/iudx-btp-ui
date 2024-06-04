import { IconButton } from "@mui/material";
import { MouseEventHandler } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styles from "./styles.module.css";
interface Props {
	onReset: MouseEventHandler<HTMLButtonElement> | undefined;
}
const MapResetButton = ({ onReset }: Props) => {
	return (
		<div>
			<IconButton
				className={styles.MapResetButton}
				onClick={onReset}
				color="inherit"
			>
				<RestartAltIcon className={styles.MapResetIcon} />
			</IconButton>
		</div>
	);
};

export default MapResetButton;
