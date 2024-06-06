"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Grid, Slider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartIcon from "@mui/icons-material/RestartAltOutlined";
import ForwardIcon from "@mui/icons-material/FastForward";
import RewindIcon from "@mui/icons-material/FastRewind";
import {
	setPlayingStatus,
	setTimeValue,
} from "@/lib/store/timeSliderSlice/timeSliderSlice";
import { useEffect } from "react";

const TimeSliderComponent = () => {
	const timeValue = useAppSelector((state) => state.timeSlider.value);
	const playingStatus = useAppSelector((state) => state.timeSlider.playing);
	const timestamps = useAppSelector((state) => state.timeSlider.timestamps);

	const min: number = 0;
	const max: number = timestamps.length - 1;

	const dispatch = useAppDispatch();

	const handleSliderChange = (_event: any, newValue: any) => {
		dispatch(setTimeValue(newValue));
	};

	useEffect(() => {
		let intervalId: any;

		if (timeValue === 0) {
			dispatch(setTimeValue(min));
		}

		if (playingStatus && timeValue < max) {
			intervalId = setInterval(() => {
				const newValue = timeValue + 1;
				dispatch(setTimeValue(newValue));
			}, 1000);
		} else if (timeValue >= max) {
			dispatch(setPlayingStatus(false));
		}

		return () => clearInterval(intervalId);
	}, [dispatch, max, playingStatus, timeValue]);

	const handlePlayClick = () => {
		if (timeValue >= max) {
			dispatch(setTimeValue(min));
		}

		dispatch(setPlayingStatus(true));
	};

	const handlePauseClick = () => {
		dispatch(setPlayingStatus(false));
	};

	const handleRestartClick = () => {
		dispatch(setTimeValue(min));
		dispatch(setPlayingStatus(false));
	};

	const handleForwardClick = () => {
		if (timeValue >= max) {
			return;
		}
		dispatch(setTimeValue(timeValue + 1));
	};

	const handleBackwardClick = () => {
		if (timeValue <= min) {
			return;
		}
		dispatch(setTimeValue(timeValue - 1));
	};

	return (
		<div
			style={{
				paddingTop: "20px",
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<div className="controlPanel">
						<button onClick={handleBackwardClick}>
							<RewindIcon />
						</button>
						{playingStatus ? (
							<button onClick={handlePauseClick}>
								<PauseIcon />
							</button>
						) : (
							<button onClick={handlePlayClick}>
								<PlayArrowIcon />
							</button>
						)}
						<button onClick={handleRestartClick}>
							<RestartIcon />
						</button>
						<button onClick={handleForwardClick}>
							<ForwardIcon />
						</button>
					</div>
				</Grid>
				<Grid item xs={6}>
					<Slider
						onChange={handleSliderChange}
						value={timeValue}
						min={min}
						max={max}
					/>
				</Grid>
				<Grid item xs={3}>
					<div className="timeValue">
						<span>{timestamps[timeValue]}</span>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default TimeSliderComponent;
