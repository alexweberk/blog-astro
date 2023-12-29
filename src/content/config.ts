import { z, defineCollection } from "astro:content";

const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.string(),
	updatedDate: z.string().optional(),
	heroImage: z.string().optional(),
	badge: z.string().optional(),
	tags: z
		.array(z.string())
		.refine((items) => new Set(items).size === items.length, {
			message: "tags must be unique",
		})
		.optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

const blogCollection = defineCollection({
	schema: ({ image }) =>
		blogSchema.extend({
			heroImage: image().optional(),
		}),
});

export const collections = {
	blog: blogCollection,
};
