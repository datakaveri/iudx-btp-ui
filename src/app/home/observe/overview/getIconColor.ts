export const getIconColor = (division: string) => {
	console.log(`Division: ${division}`);
	switch (division) {
		case "NORTH":
			return "violet";

		case "EAST":
			return "indigo";

		case "EAST ":
			return "indigo";

		case "WEST":
			return "blue";

		case "SOUTH":
			return "green";

		case "CENTRAL":
			return "yellow";

		case "NORTH-EAST":
			return "orange";

		case "SOUTH-EAST":
			return "red";

		case "WHITEFIELD":
			return "pink";
	}
};
