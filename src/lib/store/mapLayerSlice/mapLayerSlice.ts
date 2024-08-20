import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MapLayerState {
	metroLayer: boolean;
	wardsLayer: boolean;
	zoomLevel: 1.5 | 2 | 3;
	closure: "original" | "simulated" | "gnn_predicted";
}

const initialState: MapLayerState = {
	metroLayer: true,
	wardsLayer: true,
	zoomLevel: 1.5,
	closure: "original",
};

export const mapLayerSlice = createSlice({
	name: "mapLayer",
	initialState,
	reducers: {
		updateLayers: (state, action: PayloadAction<string>) => {
			state[action.payload] = !state[action.payload];
		},
		updateZoomLevel: (state, action: PayloadAction<1.5 | 2 | 3>) => {
			state.zoomLevel = action.payload;
		},
		updateClosure: (
			state,
			action: PayloadAction<"original" | "simulated" | "gnn_predicted">
		) => {
			state.closure = action.payload;
		},
	},
});

export const { updateLayers, updateZoomLevel, updateClosure } =
	mapLayerSlice.actions;

export const selectMetroLayer = (state: RootState) => state.mapLayer.metroLayer;
export const selectWardsLayer = (state: RootState) => state.mapLayer.wardsLayer;
export const selectZoomLevel = (state: RootState) => state.mapLayer.zoomLevel;
export const selectClosure = (state: RootState) => state.mapLayer.closure;

export default mapLayerSlice.reducer;
