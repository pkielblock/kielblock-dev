import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
	title: "kielblock.dev",
	description: "Pedro Kielblock`s personal website.",
};

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
