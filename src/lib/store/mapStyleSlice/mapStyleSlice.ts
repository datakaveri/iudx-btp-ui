import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MapStyleState {
	value: "Light" | "Dark" | "Satellite" | "Streets";
}

const initialState: MapStyleState = {
	value: "Streets",
};

export const mapStyleSlice = createSlice({
	name: "mapStyle",
	initialState,
	reducers: {
		setMapStyle: (
			state,
			action: PayloadAction<"Light" | "Dark" | "Satellite" | "Streets">
		) => {
			state.value = action.payload;
		},
	},
});

export const { setMapStyle } = mapStyleSlice.actions;

export const selectMapStyle = (state: RootState) => state.mapStyle.value;

export default mapStyleSlice.reducer;
