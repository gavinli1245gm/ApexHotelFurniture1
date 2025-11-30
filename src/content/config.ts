import { defineCollection, z } from 'astro:content';

const insightsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Apex Team'),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

const productsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(), // e.g., "Hotel Bedroom Furniture"
    subCategory: z.string().optional(), // e.g., "Headboards"
    description: z.string(),
    images: z.array(z.string()),
    materials: z.array(z.string()).optional(),
    dimensions: z.string().optional(),
    moq: z.string().optional(), // Minimum Order Quantity
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'insights': insightsCollection,
  'products': productsCollection,
};
