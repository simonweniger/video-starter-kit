import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define a table for storing uploaded files metadata
  files: defineTable({
    name: v.string(),
    url: v.string(),
    size: v.number(),
    type: v.string(),
    userId: v.optional(v.string()),
    projectId: v.optional(v.string()),
    createdAt: v.number(),
  }),

  // Define a table for storing shared videos
  sharedVideos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    videoUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    userId: v.optional(v.string()),
    projectId: v.string(),
    createdAt: v.number(),
  }),
});
