import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import cameraDataWithPathsAndTimeSeries from "@/data/cameraDataWithPathsAndTimeSeries.json";

interface TimeSliderState {
	selectedDate: string;
	timestamps: string[];
	value: number;
	playing: boolean;
}

const initialState: TimeSliderState = {
	selectedDate: Object.keys(cameraDataWithPathsAndTimeSeries)[0],
	timestamps: [],
	value: 0,
	playing: false,
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
	},
});

// Action creators are generated for each case reducer function
export const {
	setTimeValue,
	setPlayingStatus,
	setTimestamps,
	setSelectedDate,
} = timeSliderSlice.actions;

export const selectValue = (state: RootState) => state.timeSlider.value;
export const selectPlaying = (state: RootState) => state.timeSlider.playing;
export const selectTimestamps = (state: RootState) =>
	state.timeSlider.timestamps;
export const selectedDate = (state: RootState) => state.timeSlider.selectedDate;

export default timeSliderSlice.reducer;
