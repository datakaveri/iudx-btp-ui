import { configureStore } from "@reduxjs/toolkit";
import timeSliderReducer from "./timeSliderSlice/timeSliderSlice";
export const makeStore = () => {
	return configureStore({
		reducer: {
			timeSlider: timeSliderReducer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
