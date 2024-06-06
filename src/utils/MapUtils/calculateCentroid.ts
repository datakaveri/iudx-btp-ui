export function calculateCentroid(coordinates: number[][]) {
	let sumX = 0;
	let sumY = 0;

	for (let i = 0; i < coordinates.length; i++) {
		sumX += coordinates[i][0];
		sumY += coordinates[i][1];
	}

	const centroidX = sumX / coordinates.length;
	const centroidY = sumY / coordinates.length;

	return [centroidX, centroidY];
}
