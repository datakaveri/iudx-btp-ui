import * as React from "react";
import { useCallback } from "react";
import styles from "./styles.module.css";

export type Mode = "side-by-side" | "split-screen";

function ControlPanel(props: {
	mode: Mode;
	onModeChange: (newMode: Mode) => void;
}) {
	const onModeChange = useCallback(
		(evt) => {
			props.onModeChange(evt.target.value as Mode);
		},
		[props]
	);

	return (
		<div className={styles.swipeControlPanel}>
			<div>
				<label>Mode: </label>
				<select value={props.mode} onChange={onModeChange}>
					<option value="side-by-side">Side by side</option>
					<option value="split-screen">Split screen</option>
				</select>
			</div>
		</div>
	);
}

export default React.memo(ControlPanel);
