import OpenAI from 'openai';
import { prisma } from '@/lib/db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processArticleWithAI(articleId: string) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { source: true, category: true }
  });

  if (!article || article.status !== 'DRAFT') return;

  const prompt = `
    You are an expert news editor for NcN, a premium AI-powered news platform.
    Rewrite the following news article fragment into a 100% original, copyright-safe, and SEO-optimized summary.
    
    ORIGINAL TITLE: ${article.originalTitle}
    ORIGINAL CONTENT: ${article.content}
    SOURCE: ${article.source.name}

    INSTRUCTIONS:
    1. Generate a new, click-worthy, SEO-optimized title (Max 70 chars).
    2. Write a concise summary (1-2 sentences).
    3. Generate 3-5 key bullet points of the main facts.
    4. Rewrite the main content into a 200-300 word original article.
    5. Provide 5 SEO tags.
    6. Ensure the tone is professional, factual, and premium.
    7. DO NOT plagiarize original sentences. Use your own words.

    OUTPUT FORMAT (Strict JSON):
    {
      "title": "...",
      "summary": "...",
      "key_points": ["...", "..."],
      "content": "...",
      "seo_description": "...",
      "seo_tags": ["...", "..."]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "system", content: "You are a news editor bot." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const aiData = JSON.parse(response.choices[0].message.content || '{}');

    await prisma.article.update({
      where: { id: articleId },
      data: {
        title: aiData.title,
        summary: aiData.summary,
        keyPoints: aiData.key_points,
        content: aiData.content,
        seoDescription: aiData.seo_description,
        seoTags: aiData.seo_tags,
        status: 'PUBLISHED', // Auto-publish for the demo, could be PENDING_REVIEW
        publishedAt: new Date(),
        slug: aiData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      }
    });

    console.log(`AI processing complete for: ${aiData.title}`);
  } catch (error) {
    console.error(`AI processing error for ${articleId}:`, error);
  }
}
