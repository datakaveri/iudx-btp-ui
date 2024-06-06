import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Junctions | AI Based Demand Forecasting",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <section>{children}</section>;
}
