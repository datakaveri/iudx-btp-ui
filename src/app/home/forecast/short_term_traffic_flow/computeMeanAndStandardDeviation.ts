export function computeMean(arr) {
	// Check if the array is empty
	if (arr.length === 0) return 0;

	// Sum the elements using reduce
	const sum = arr.reduce((acc, value) => acc + value, 0);

	// Divide the sum by the number of elements to get the mean
	const mean = sum / arr.length;

	return mean;
}

export function computeStandardDeviation(arr) {
	// Check if the array is empty
	if (arr.length === 0) return 0;

	// Calculate the mean
	const mean = computeMean(arr);

	// Calculate the sum of squared differences from the mean
	const squaredDifferences = arr.map((value) => {
		const difference = value - mean;
		return difference * difference;
	});

	// Calculate the mean of squared differences (variance)
	const variance =
		squaredDifferences.reduce((acc, value) => acc + value, 0) / arr.length;

	// Standard deviation is the square root of the variance
	const standardDeviation = Math.sqrt(variance);

	return standardDeviation;
}
