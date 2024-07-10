import axios from "axios";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getStartTime } from "../auth/[...nextauth]/getStartDate";
import { getCurrentTime } from "../auth/[...nextauth]/getCurrentDate";

export async function getBearerToken() {
	const session = await getServerSession(authOptions);

	try {
		const options = {
			method: "POST",
			url: process.env.TOKEN_URL,
			headers: {
				authorization: `Bearer ${session.token.accessToken}`,
			},
			data: {
				itemId: "rs.cos.iudx.org.in",
				itemType: "resource_server",
				role: "consumer",
			},
		};

		const response = await axios.request(options);
		return response.data.results.accessToken;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function GET() {
	try {
		const options = {
			method: "POST",
			url: process.env.TEMPORAL_QUERY_URL,
			headers: {
				token: await getBearerToken(),
			},
			data: {
				type: "Query",
				entities: [
					{
						id: "0bb06335-09b0-4209-a2b0-d27953f301b3",
					},
				],
				temporalQ: {
					timerel: "during",
					time: getStartTime(),
					endtime: getCurrentTime(),
					timeProperty: "observationDateTime",
				},
			},
		};
		const response = await axios.request(options);
		return new Response(JSON.stringify(response.data), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err) {
		console.error("Error fetching data:", err);
	}
}
