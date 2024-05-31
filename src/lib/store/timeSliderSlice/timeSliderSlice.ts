import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TimeSliderState {
	timestamps: string[];
	value: number;
	playing: boolean;
}

const initialState: TimeSliderState = {
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
	},
});

// Action creators are generated for each case reducer function
export const { setTimeValue, setPlayingStatus, setTimestamps } =
	timeSliderSlice.actions;

export const selectValue = (state: RootState) => state.timeSlider.value;
export const selectPlaying = (state: RootState) => state.timeSlider.playing;
export const selectTimestamps = (state: RootState) =>
	state.timeSlider.timestamps;

export default timeSliderSlice.reducer;
