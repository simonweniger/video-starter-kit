// Import the correct client for React integration
import { ConvexReactClient } from "convex/react";

// Create a Convex client with your deployment URL
export const convex = new ConvexReactClient(
  "https://eager-bat-724.convex.cloud",
);
