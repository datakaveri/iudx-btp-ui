import { configureStore } from "@reduxjs/toolkit";
import timeSliderReducer from "./timeSliderSlice/timeSliderSlice";
export const store = configureStore({
	reducer: {
		timeSlider: timeSliderReducer,
	},
});

// Infer the type of makeStore

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
