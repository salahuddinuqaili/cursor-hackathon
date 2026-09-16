import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./styles/globals.css";

export const links: Route.LinksFunction = () => [
	{ rel: "icon", href: "/favicon.ico", sizes: "any" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#302f2a" />
				<Meta />
				<Links />
			</head>
			<body>
				<a
					href="#main-content"
					className="hardframe-skip-link fixed z-50 -translate-y-16 border border-frame-ink bg-annotation px-3 py-2 font-ui text-ui text-annotation-foreground focus:translate-y-0"
				>
					Skip to main content
				</a>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="hardframe-safe-area flex min-h-dvh bg-frame-ink">
			<section
				id="main-content"
				className="flex w-full flex-1 flex-col gap-4 bg-background p-6"
			>
				<h1 className="text-balance font-display text-heading-1">{message}</h1>
				<p className="text-pretty font-body text-body">{details}</p>
				{stack ? (
					<pre className="w-full overflow-x-auto border border-frame-ink p-4 font-mono text-body-sm">
						<code>{stack}</code>
					</pre>
				) : null}
			</section>
		</main>
	);
}
