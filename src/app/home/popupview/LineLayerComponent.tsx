import React, { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";
import { getLayerProps } from "./getLayerProps";
import { PopupInfo } from "./page";
import axios from "axios";

interface Props {
	popupInfo: PopupInfo;
}

interface PathInterface {
	counts: number[][];
	geometries: string[][];
	timestamps: string[];
}

const LineLayerComponent = ({ popupInfo }: Props) => {
	const [paths, setPaths] = useState<PathInterface>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (Object.keys(popupInfo.pathLinks).length > 0) {
			const time = Object.keys(popupInfo.pathLinks)[0];
			axios.get(encodeURI(popupInfo.pathLinks[time])).then((res) => {
				setPaths(res.data);
				setLoading(false);
				console.log(res.data);
			});
		}
	}, [popupInfo.pathLinks]);

	return !loading
		? paths?.geometries[1].map((path, index) => {
				return (
					<Source
						key={index}
						id={index.toString()}
						type="geojson"
						data={JSON.parse(path)}
					>
						<Layer
							id={index.toString()}
							{...getLayerProps({
								pollutantVal: paths.counts[1][index],
								min: 0,
								max: 200,
								average: 100,
								stddev: 10,
							})}
						/>
					</Source>
				);
		  })
		: null;
};

export default LineLayerComponent;
