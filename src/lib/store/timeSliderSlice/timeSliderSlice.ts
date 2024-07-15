import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import cameraDataWithPathsAndTimeSeries from "@/data/cameraDataWithPathsAndTimeSeries.json";
import { getColorsList } from "./getTimeSeriesColors";

export interface ColorsListItem {
	selected: boolean;
	color: string;
	path: string;
}

interface TimeSliderState {
	selectedDate: string;
	timestamps: string[];
	value: number;
	playing: boolean;
	colorsList: ColorsListItem[];
}

const initialState: TimeSliderState = {
	selectedDate: Object.keys(cameraDataWithPathsAndTimeSeries)[0],
	timestamps: [],
	value: 0,
	playing: false,
	colorsList: getColorsList(),
};

export const timeSliderSlice = createSlice({
	name: "timeSlider",
	initialState,
	reducers: {
		setTimeValue: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
		setPlayingStatus: (state, action: PayloadAction<boolean>) => {
			state.playing = action.payload;
		},
		setTimestamps: (state, action: PayloadAction<string[]>) => {
			state.timestamps = action.payload;
		},
		setSelectedDate: (state, action: PayloadAction<string>) => {
			state.selectedDate = action.payload;
		},
		setTimeseriesColorsList: (
			state,
			action: PayloadAction<ColorsListItem[]>
		) => {
			state.colorsList = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setTimeValue,
	setPlayingStatus,
	setTimestamps,
	setSelectedDate,
	setTimeseriesColorsList,
} = timeSliderSlice.actions;

export const selectValue = (state: RootState) => state.timeSlider.value;
export const selectPlaying = (state: RootState) => state.timeSlider.playing;
export const selectTimestamps = (state: RootState) =>
	state.timeSlider.timestamps;
export const selectedDate = (state: RootState) => state.timeSlider.selectedDate;
export const colorsList = (state: RootState) => state.timeSlider.colorsList;

export default timeSliderSlice.reducer;
