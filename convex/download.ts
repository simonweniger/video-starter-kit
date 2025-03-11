import { httpAction } from "./_generated/server";

// Replaces the Next.js API route for downloading files
export const downloadFile = httpAction(async ({ runQuery }, request) => {
  const url = new URL(request.url).searchParams.get("url");
  
  if (!url) {
    return new Response("Missing 'url' query parameter", {
      status: 400,
    });
  }
  
  try {
    const parsedUrl = new URL(url);
    return await fetch(parsedUrl.toString());
  } catch (error) {
    return new Response("Invalid 'url' query parameter", {
      status: 400,
    });
  }
});
