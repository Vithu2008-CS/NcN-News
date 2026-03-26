import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { fetchLatestNews } from '../services/newsFetcher';
import { processArticleWithAI } from '../ai/summarizer';
import { prisma } from '../db';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const newsQueue = new Queue('news-tasks', { connection });

export const newsWorker = new Worker(
  'news-tasks',
  async (job: Job) => {
    if (job.name === 'fetch-news') {
      await fetchLatestNews();
      
      // After fetching, queue AI processing for any new drafts
      const drafts = await prisma.article.findMany({
        where: { status: 'DRAFT' },
        take: 10 // process in batches
      });

      for (const draft of drafts) {
        await newsQueue.add('process-ai', { articleId: draft.id });
      }
    }

    if (job.name === 'process-ai') {
      const { articleId } = job.data;
      await processArticleWithAI(articleId);
    }
  },
  { connection }
);

console.log('NcN Background Worker Started');
