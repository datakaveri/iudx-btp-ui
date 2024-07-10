export function getStartTime() {
	// Create a new Date object for the current date and time
	const now = new Date();

	// Set the time to 12:00 AM
	now.setHours(0, 0, 0, 0);

	// Use the toLocaleString method to format the date in the desired time zone (IST, UTC+5:30)
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "Asia/Kolkata",
		hour12: false,
	};

	const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(now);

	// Extract the individual components
	const [date, time] = formattedDate.split(", ");
	const [day, month, year] = date.split("/");
	const [hours, minutes, seconds] = time.split(":");

	// Combine the components into the desired format
	const customFormattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;

	return customFormattedDate;
}
