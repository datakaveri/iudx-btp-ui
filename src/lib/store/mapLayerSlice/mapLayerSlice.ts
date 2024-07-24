import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { execOnce } from "next/dist/shared/lib/utils";

interface MapLayerState {
	metroLayer: boolean;
	wardsLayer: boolean;
	zoomLevel: 1.5 | 2 | 3;
}

const initialState: MapLayerState = {
	metroLayer: true,
	wardsLayer: true,
	zoomLevel: 1.5,
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
	},
});

export const { updateLayers, updateZoomLevel } = mapLayerSlice.actions;

export const selectMetroLayer = (state: RootState) => state.mapLayer.metroLayer;
export const selectWardsLayer = (state: RootState) => state.mapLayer.wardsLayer;
export const selectZoomLevel = (state: RootState) => state.mapLayer.zoomLevel;
export default mapLayerSlice.reducer;
