import {
	MAPBOX_LIGHT,
	MAPBOX_SATELLITE,
	MAPBOX_STREETS,
	MAPBOX_STYLE,
} from "@/environments/environments";

export enum PlayerState {
	UNSTARTED = "UNSARTED",
	ENDED = "ENDED",
	PLAYING = "PLAYING",
	PAUSE = "PAUSE",
	BUFFERING = "BUFFERING",
	LOADING = "LOADING",
	LOADED = "LOADED",
}

export const MAPBOX_STYLES = [
	{
		value: "Dark",
		url: MAPBOX_STYLE,
		image: require("@/public/maps/dark.png"),
	},
	{
		value: "Light",
		url: MAPBOX_LIGHT,
		image: require("@/public/maps/light.png"),
	},
	{
		value: "Streets",
		url: MAPBOX_STREETS,
		image: require("@/public/maps/streets.png"),
	},
	{
		value: "Satellite",
		url: MAPBOX_SATELLITE,
		image: require("@/public/maps/satellite.png"),
	},
];
