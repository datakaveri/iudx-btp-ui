"use client";

import { useEffect, useState } from "react";

export default function Page() {
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch("/api/getDataset");
			const resJson = await result.json();
			setData(resJson);
		};

		fetchData();
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Data fetched from API route using App Router</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
