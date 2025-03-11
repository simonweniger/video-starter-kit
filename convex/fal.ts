import { httpAction } from "./_generated/server";

// Replaces the Next.js API route for fal.ai server proxy
// This is a simple proxy that forwards requests to fal.ai
export const proxyRequest = httpAction(async ({ runQuery }, request) => {
  // Get the target URL from the request
  const targetUrl = request.headers.get("x-fal-target-url");
  if (!targetUrl) {
    return new Response("Missing target URL", { status: 400 });
  }

  // Clone the request to forward
  const requestInit: RequestInit = {
    method: request.method,
    headers: request.headers,
    body: request.body,
  };

  // Forward the request to fal.ai
  try {
    const response = await fetch(targetUrl, requestInit);
    return response;
  } catch (error) {
    console.error("Error proxying request to fal.ai:", error);
    return new Response("Error proxying request", { status: 500 });
  }
});
