import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Id } from "./_generated/dataModel";

// Generate a signed URL for file upload
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Store file metadata after upload
export const createFile = mutation({
  args: {
    storageId: v.string(),
    name: v.string(),
    type: v.string(),
    size: v.number(),
    projectId: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get the URL for the file - no need to check if file exists as the URL generation will fail if it doesn't
    const url = await ctx.storage.getUrl(args.storageId);
    
    if (!url) {
      throw new ConvexError("Failed to get URL for uploaded file");
    }
    
    // Store file metadata in the database
    const fileId = await ctx.db.insert("files", {
      name: args.name,
      url: url,
      size: args.size,
      type: args.type,
      userId: args.userId,
      projectId: args.projectId,
      createdAt: Date.now(),
    });

    return { fileId, url };
  },
});

// Get a file by ID
export const getFile = query({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.fileId);
  },
});

// List files for a project
export const listFiles = query({
  args: { projectId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.projectId) {
      return [];
    }
    
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .order("desc")
      .collect();
  },
});

// Delete a file
export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError("File not found");
    }

    // Delete the file from storage
    // Extract the storageId from the URL or store it directly in your schema
    const storageId = file.url.split("/").pop() || "";
    if (storageId) {
      await ctx.storage.delete(storageId);
    }

    // Delete the file metadata from the database
    await ctx.db.delete(args.fileId);
    return { success: true };
  },
});
