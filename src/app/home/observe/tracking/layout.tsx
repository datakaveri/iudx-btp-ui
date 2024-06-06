import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tracking | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <section>{children}</section>;
}
