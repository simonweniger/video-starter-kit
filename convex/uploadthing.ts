import { mutation, query, httpAction } from "./_generated/server";
import { v } from "convex/values";

// Query to get all files for a specific project
export const getFiles = query({
  args: {
    projectId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const query = args.projectId
      ? ctx.db
          .query("files")
          .filter((q) => q.eq(q.field("projectId"), args.projectId))
      : ctx.db.query("files");

    return await query.order("desc").collect();
  },
});

// Mutation to store file metadata after upload
export const storeFile = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    size: v.number(),
    type: v.string(),
    userId: v.optional(v.string()),
    projectId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const fileId = await ctx.db.insert("files", {
      name: args.name,
      url: args.url,
      size: args.size,
      type: args.type,
      userId: args.userId,
      projectId: args.projectId,
      createdAt: Date.now(),
    });

    return fileId;
  },
});

// Mutation to delete a file
export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.fileId);
    return true;
  },
});

// HTTP action to handle uploadthing API requests
// This proxies the requests to the uploadthing service
export const uploadthingApi = httpAction(async ({ runQuery }, request) => {
  // For GET requests (used for configuration and health checks)
  if (request.method === "GET") {
    // Return a basic configuration response
    // In a real implementation, this would return the actual uploadthing configuration
    return Response.json({
      status: "ok",
      message: "Uploadthing API endpoint is operational",
    });
  }

  // For POST requests (used for file uploads)
  if (request.method === "POST") {
    try {
      const payload = await request.json();

      // In a real implementation, this would forward the request to uploadthing
      // and process the response

      // For now, we'll simulate a successful upload response
      // Note: In a real HTTP action, we would need to use the Convex HTTP API
      // to store data, as we can't directly access the database from an HTTP action
      if (payload.file) {
        // Generate a mock file ID
        const mockFileId = `file_${Date.now()}`;

        return Response.json({
          status: "ok",
          fileId: mockFileId,
          file: payload.file,
          message:
            "File upload simulated - in a real implementation, this would store the file metadata in the database",
        });
      }

      return Response.json(
        {
          status: "error",
          message: "Invalid file data",
        },
        { status: 400 },
      );
    } catch (error) {
      console.error("Error processing uploadthing request:", error);
      return Response.json(
        {
          status: "error",
          message: "Error processing upload request",
        },
        { status: 500 },
      );
    }
  }

  // For any other HTTP methods
  return new Response("Method not allowed", { status: 405 });
});
