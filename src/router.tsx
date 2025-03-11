import {
  Router,
  Route,
  RootRoute,
  createRootRouteWithContext,
  createRoute,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { lazy } from "react";

// Import layouts
import RootLayout from "@/layouts/RootLayout";
import AppLayout from "@/layouts/AppLayout";

// Import pages
const IndexPage = lazy(() => import("@/routes/index"));
const SharePage = lazy(() => import("@/routes/share"));

// Create a root route
const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});

// Create routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/share/$id",
  component: SharePage,
});

// Create the route tree using the routes
const routeTree = rootRoute.addChildren([indexRoute, shareRoute]);

// Create the router using the route tree
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient: new QueryClient(),
  },
});

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
