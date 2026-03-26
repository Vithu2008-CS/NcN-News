import Parser from 'rss-parser';
import { prisma } from '@/lib/db';

const parser = new Parser();

export const newsSources = [
  { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/rss.xml', category: 'General' },
  { name: 'Reuters Business', url: 'https://www.reutersagency.com/feed/?best-topics=business', category: 'Business' },
  { name: 'Al Jazeera', url: 'https://www.aljazeera.com/xml/rss/all.xml', category: 'General' },
  { name: 'CNN Top Stories', url: 'http://rss.cnn.com/rss/cnn_topstories.rss', category: 'General' },
  { name: 'The Guardian', url: 'https://www.theguardian.com/world/rss', category: 'World' },
];

export async function fetchLatestNews() {
  console.log('Starting news ingestion...');
  
  for (const source of newsSources) {
    try {
      console.log(`Fetching from ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      // Ensure source exists in DB
      let dbSource = await prisma.source.findFirst({
        where: { url: source.url }
      });
      
      if (!dbSource) {
        dbSource = await prisma.source.create({
          data: {
            name: source.name,
            url: source.url,
            type: 'RSS',
            isActive: true,
          }
        });
      }

      // Ensure category exists
      let dbCategory = await prisma.category.findUnique({
        where: { slug: source.category.toLowerCase() }
      });

      if (!dbCategory) {
        dbCategory = await prisma.category.create({
          data: {
            name: source.category,
            slug: source.category.toLowerCase(),
          }
        });
      }

      for (const item of feed.items) {
        if (!item.link || !item.title) continue;

        // Check if article already exists
        const existing = await prisma.article.findUnique({
          where: { originalUrl: item.link }
        });

        if (existing) continue;

        // Create initial draft
        await prisma.article.create({
          data: {
            originalTitle: item.title,
            originalUrl: item.link,
            title: item.title, // Initial title
            slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            content: item.contentSnippet || item.content || '',
            status: 'DRAFT',
            sourceId: dbSource.id,
            categoryId: dbCategory.id,
            imageUrl: item.enclosure?.url || null,
          }
        });
        
        console.log(`Saved draft: ${item.title}`);
      }
      
      await prisma.source.update({
        where: { id: dbSource.id },
        data: { lastFetchedAt: new Date() }
      });

    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error);
    }
  }
}
