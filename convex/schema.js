import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    technology: v.object({
      frontend: v.optional(v.array(v.string())),
      backend: v.optional(v.array(v.string())),
    }),
    links:v.object({
        serverCodeLink:v.optional(v.string()),
        frontendCodeLink:v.optional(v.string()),
        hostingLink:v.optional(v.string()),
    })
  }),
});
