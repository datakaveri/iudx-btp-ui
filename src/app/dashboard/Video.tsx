"use client";

import React, { useEffect } from "react";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface Props {
	src: string;
	title: string;
}

const Video = ({ src, title }: Props) => {
	return (
		<MediaPlayer
			title={title}
			src={
				"https://file.cos.iudx.org.in/iudx/v1/download?file-id=210c9a86-d87c-462b-9c21-8949534df0e8%2Fsample.mp4?token=eyJpc3MiOiJjb3MuaXVkeC5vcmcuaW4iLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJzdWIiOiI0NzI3ZTI0Yy0wZDkzLTQ1NDUtYjdiNC1lYTNlZTI5ZjYwODYiLCJpc3MiOiJjb3MuaXVkeC5vcmcuaW4iLCJhdWQiOiJycy5jb3MuaXVkeC5vcmcuaW4iLCJleHAiOjE3MTYzMzU1MzIsImlhdCI6MTcxNjI5MjMzMiwiaWlkIjoicmk6M2VmMGNkMWYtNTY5MC00NmNjLTliNzgtMzVlM2I1ZjQ3OTFkIiwicm9sZSI6ImNvbnN1bWVyIiwiY29ucyI6eyJhY2Nlc3MiOlsiYXBpIiwic3ViIiwiZmlsZSIsImFzeW5jIl19LCJyZyI6ImJhN2IxNWQ0LTYzNmUtNGIxNi04YmI0LTM2M2Y2ZWQ5ODk4MCJ9.6NVhkeJN33XvVfIGvVXolzNyCDejhlC-Vyzxb6xLWj2ZJT2R9nuATS51zI3NiLIN_PJUr6IgETd5UN1pyxWBQg"
			}
		>
			<MediaProvider />
			<DefaultVideoLayout icons={defaultLayoutIcons} />
		</MediaPlayer>
	);
};

export default Video;
