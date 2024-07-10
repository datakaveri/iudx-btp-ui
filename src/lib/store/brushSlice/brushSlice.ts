import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface BrushState {
	value: number;
	startTime: number;
	endTime: number;
}

const initialState: BrushState = {
	value: 0,
	startTime: 0,
	endTime: 0,
};

export const brushSlice = createSlice({
	name: "brush",
	initialState,
	reducers: {
		setSelectedTime: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
		setBounds: (
			state,
			action: PayloadAction<{
				startTime: number;
				endTime: number;
			}>
		) => {
			state.startTime = action.payload.startTime;
			state.endTime = action.payload.endTime;
		},
	},
});

export const { setSelectedTime, setBounds } = brushSlice.actions;

export const selectBrushValue = (state: RootState) => state.brush.value;
export const selectStartTime = (state: RootState) => state.brush.startTime;
export const selectEndTime = (state: RootState) => state.brush.endTime;

export default brushSlice.reducer;
