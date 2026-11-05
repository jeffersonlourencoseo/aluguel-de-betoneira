import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

const atuacaoCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    local: z.string(),
    updatedDate: z.date().optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

const servicosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    capacidade: z.string(),
    motor: z.string().optional(),
    peso: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  servicos: servicosCollection,
  atuacao: atuacaoCollection,
};
