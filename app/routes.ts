import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("features/counter/route.tsx"),
	route("api/counter/events", "features/counter/counter-events.route.ts"),
] satisfies RouteConfig;
