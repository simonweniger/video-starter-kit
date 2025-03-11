import { httpRouter } from "convex/server";

import { downloadFile } from "./download";
import { proxyRequest } from "./fal";
import { shareApi } from "./share";
import { uploadthingApi } from "./uploadthing";

// Create an HTTP router for the Convex API
const http = httpRouter();

// Register the HTTP routes
http.route({
  path: "/api/download",
  method: "GET",
  handler: downloadFile,
});

// For the fal API, we need to create separate routes for each method
http.route({
  path: "/api/fal",
  method: "GET",
  handler: proxyRequest,
});

http.route({
  path: "/api/fal",
  method: "POST",
  handler: proxyRequest,
});

http.route({
  path: "/api/fal",
  method: "PUT",
  handler: proxyRequest,
});

http.route({
  path: "/api/share",
  method: "POST",
  handler: shareApi,
});

// For the uploadthing API, we need to create separate routes for each method
http.route({
  path: "/api/uploadthing",
  method: "GET",
  handler: uploadthingApi,
});

http.route({
  path: "/api/uploadthing",
  method: "POST",
  handler: uploadthingApi,
});

// Export the HTTP router
export default http;
