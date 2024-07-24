export const calculateProgress = (startTime, endTime, selectedTime) => {
	// Convert timestamps to Date objects
	let start = new Date(startTime);
	let end = new Date(endTime);
	let selected = new Date(selectedTime);

	// Calculate durations in milliseconds
	let totalDuration = end - start;
	let selectedDuration = selected - start;

	// Calculate progress percentage
	let progress = (selectedDuration / totalDuration) * 100;

	// Ensure the progress is within 0% to 100%
	progress = Math.max(0, Math.min(progress, 100));

	return progress;
};
