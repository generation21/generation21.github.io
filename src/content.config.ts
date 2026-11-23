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
        // false면 대표 사례 카드에 넣지 않고, 아카이브의 replaces 항목에서 이 페이지로 잇는다
        featured: z.boolean().default(true),
        // projects.json에서 이 사례에 해당하는 항목의 title (대표 사례면 아카이브 목록에서 제외)
        replaces: z.string(),
    }),
});

export const collections = { work };
