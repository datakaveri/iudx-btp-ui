import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ReIdState {
	vehicleId: string;
}

const initialState: ReIdState = {
	vehicleId: "18001",
};

export const reIdSlice = createSlice({
	name: "reId",
	initialState,
	reducers: {
		selectVehicleId: (state, action: PayloadAction<string>) => {
			state.vehicleId = action.payload;
		},
	},
});

export const { selectVehicleId } = reIdSlice.actions;

export const selectMetroLayer = (state: RootState) => state.reId.vehicleId;

export default reIdSlice.reducer;
