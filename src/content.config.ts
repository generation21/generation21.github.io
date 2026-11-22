import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/work" }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        period: z.string(),
        company: z.string(),
        role: z.string(),
        highlights: z.array(z.string()).length(3),
        stack: z.array(z.string()),
        order: z.number(),
        // projects.json에서 이 사례로 대체되는 항목의 title (아카이브 목록에서 제외)
        replaces: z.string(),
    }),
});

export const collections = { work };
