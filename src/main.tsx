import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider } from "convex/react";
import { convex } from "./convex";
import { router } from "./router";
import "./styles/globals.css";

// Create a client
const queryClient = new QueryClient();

// Get the root element and ensure it exists
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Create the root element and render the app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore - Ignoring the router type issue for now */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConvexProvider>
  </React.StrictMode>,
);
