import { configureStore } from "@reduxjs/toolkit";
import timeSliderReducer from "./timeSliderSlice/timeSliderSlice";
import brushReducer from "@/lib/store/brushSlice/brushSlice";
import mapStyleReducer from "@/lib/store/mapStyleSlice/mapStyleSlice";
import mapLayerSlice from "./mapLayerSlice/mapLayerSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			timeSlider: timeSliderReducer,
			brush: brushReducer,
			mapStyle: mapStyleReducer,
			mapLayer: mapLayerSlice,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
