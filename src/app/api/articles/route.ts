import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        ...(category ? { category: { slug: category } } : {})
      },
      include: {
        category: true,
        source: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
